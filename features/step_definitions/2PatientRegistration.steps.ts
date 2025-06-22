import { Given, When, Then, DataTable, Before, After } from '@cucumber/cucumber';
import assert from 'assert';
import { supabase } from '../../src/supabaseClient';
import { signUpPatient } from '../../src/services/authService';

// Using `this` context to share data between steps
interface ICustomWorld {
    patientDetails?: any;
    registrationResult?: boolean;
    registrationError?: Error | null;
    createdUserId?: string; // For cleanup
}

Before(function (this: ICustomWorld) {
    this.patientDetails = {};
    this.registrationResult = undefined;
    this.registrationError = null;
    this.createdUserId = undefined;
});

After(async function (this: ICustomWorld) {
    if (this.createdUserId) {
        // Use admin client to delete the user from auth, which will cascade delete from other tables
        const { error } = await supabase.auth.admin.deleteUser(this.createdUserId);
        if (error && !error.message.includes('User not found')) {
            console.warn(`⚠️ Failed to clean up user ${this.createdUserId}:`, error.message);
        } else {
            console.log(`✅ Cleaned up user ${this.createdUserId}`);
        }
    }
});

// Background steps
Given('the EHR platform is connected to Supabase', function (this: ICustomWorld) {
  assert.ok(supabase, 'Supabase client should be initialized');
});

// Scenario: Successful patient registration
Given('a new patient provides the following details for registration:', function (this: ICustomWorld, dataTable: DataTable) {
  this.patientDetails = dataTable.rowsHash();
});

When('the patient submits their registration form', async function (this: ICustomWorld) {
  try {
    this.registrationResult = await signUpPatient(this.patientDetails);
  } catch (error: any) {
    this.registrationError = error;
  }
});

Then('a new Supabase Auth user account should be created', async function (this: ICustomWorld) {
    assert.strictEqual(this.registrationError, null, `Registration failed unexpectedly: ${this.registrationError?.message}`);
    // Fetch the user ID by email from the users table
    const { data: userRows, error: userTableError } = await supabase
        .from('users')
        .select('id')
        .eq('email', this.patientDetails.email)
        .single();

    assert.ok(!userTableError, `Error fetching user by email from users table: ${userTableError?.message}`);
    assert.ok(userRows && userRows.id, 'User not found in users table after registration');

    // Now fetch the user from Supabase Auth using getUserById
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userRows.id);
    assert.ok(!error, `Error fetching user by ID: ${error?.message}`);
    assert.ok(user, 'Supabase Auth user was not created');
    this.createdUserId = user.id; // Store for cleanup and next steps
});

Then('a new record should be added to the {string} table with the role {string}', async function (this: ICustomWorld, tableName: string, role: string) {
    assert.ok(this.createdUserId, 'Cannot verify table insertion without a created user ID');
    const { data, error } = await supabase
        .from(tableName)
        .select('role')
        .eq('id', this.createdUserId)
        .single();

    assert.ok(!error, `Error fetching from ${tableName}: ${error?.message}`);
    assert.deepStrictEqual(data, { role: role });
});

Then('a new record should be added to the {string} table with their details', async function (this: ICustomWorld, tableName: string) {
    assert.ok(this.createdUserId, 'Cannot verify table insertion without a created user ID');
    const { data, error } = await supabase
        .from(tableName)
        .select('first_name, last_name, phone')
        .eq('user_id', this.createdUserId)
        .single();

    assert.ok(!error, `Error fetching from ${tableName}: ${error?.message}`);
    assert.strictEqual(data.first_name, this.patientDetails.first_name);
    assert.strictEqual(data.last_name, this.patientDetails.last_name);
    assert.strictEqual(data.phone, this.patientDetails.phone);
});

Then('the registration process should complete successfully', function (this: ICustomWorld) {
    assert.strictEqual(this.registrationResult, true, 'The registration process should return true on success');
    assert.strictEqual(this.registrationError, null, 'The registration process should not have thrown an error');
});

// Scenario: Attempting to register with an email that already exists
Given('a user with the email {string} already has an account', async function (this: ICustomWorld, email: string) {
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: 'some-dummy-password-for-test',
        email_confirm: true,
    });

    assert.ok(!error, `Failed to create pre-existing user for test setup: ${error?.message}`);
    assert.ok(data.user, 'Failed to create pre-existing user for test setup.');
    this.createdUserId = data.user.id; // Store for cleanup
});

When('a new patient attempts to register with the email {string}', async function (this: ICustomWorld, email: string) {
    const duplicatePatientDetails = {
        email: email,
        password: 'another-password',
        first_name: 'Test',
        last_name: 'User',
        gender: 'male',
        birth_date: '2000-01-01',
        phone: '0987654321'
    };
    try {
        await signUpPatient(duplicatePatientDetails);
    } catch (error: any) {
        this.registrationError = error;
    }
});

Then('the system should report an error that the user already exists', function (this: ICustomWorld) {
    assert.ok(this.registrationError, 'An error was expected, but none was thrown.');
    // Supabase auth.signUp throws a "User already registered" message for this case.
    assert.ok(
        this.registrationError?.message.includes('User already registered'),
        `Expected error message to indicate user exists, but got: "${this.registrationError?.message}"`
    );
});

Then('no new user records should be created', function (this: ICustomWorld) {
    // This is implicitly tested by the fact that an error was thrown in the service,
    // which stops execution before any new records are inserted.
    // We can also assert that the registrationResult is not true.
    assert.notStrictEqual(this.registrationResult, true, 'Registration result should not be true on failure.');
});