import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';
import { supabase } from '../../src/supabaseClient';
import { createHederaAccount } from '../../src/createHederaAccount';

let userInput: any = {};
let supabaseUser: any = null;
let hederaAccount: any = null;
let userInsertError: any = null;
let roleInsertError: any = null;
let role: string = '';
let successMessage: string = '';

Given(/^the Supabase and Hedera services are available$/, function () {
  assert.ok(supabase, 'Supabase client should be initialized');
  assert.ok(createHederaAccount, 'Hedera account creation function should be available');
});

Given(/^a new user provides the following information:$/, function (dataTable: DataTable) {
  const data = dataTable.hashes()[0];
  userInput = { ...data };
  role = data.role;
});

When(/^the registration is submitted$/, async function () {
  // 1. Create Supabase Auth user
  const { data, error } = await supabase.auth.admin.createUser({
    email: userInput.email,
    phone: userInput.phone,
    password: userInput.password,
    email_confirm: true,
  });
  supabaseUser = data?.user;
  if (error || !supabaseUser) {
    userInsertError = error;
    return;
  }
  // 2. Create Hedera account
  hederaAccount = await createHederaAccount();
  // 3. Insert into global users table
  const { error: insertError } = await supabase.from('users').insert({
    id: supabaseUser.id,
    full_name: `${userInput.first_name} ${userInput.last_name}`,
    email: userInput.email,
    role: userInput.role,
    hedera_account_id: hederaAccount.accountId,
    hedera_private_key: hederaAccount.privateKey,
    hedera_public_key: hederaAccount.publicKey,
  });
  userInsertError = insertError;
  // 4. Insert into role-specific table
  const roleData = {
    user_id: supabaseUser.id,
    phone: userInput.phone,
    first_name: userInput.first_name,
    last_name: userInput.last_name,
    date_of_birth: userInput.date_of_birth,
    gender: userInput.gender,
  };
  let insertResult;
  switch (userInput.role) {
    case 'doctor':
      insertResult = await supabase.from('doctors').insert(roleData);
      break;
    case 'pharmacist':
      insertResult = await supabase.from('pharmacists').insert(roleData);
      break;
    case 'lab':
      insertResult = await supabase.from('labs').insert(roleData);
      break;
    default:
      roleInsertError = 'Unknown role';
      return;
  }
  roleInsertError = insertResult.error;
  if (!userInsertError && !roleInsertError) {
    successMessage = `✅ ${userInput.role} created successfully.`;
  }
});

Then(/^a new Supabase Auth user should be created$/, function () {
  assert.ok(supabaseUser, 'Supabase Auth user should be created');
});

Then(/^a new Hedera account should be created and linked$/, function () {
  assert.ok(hederaAccount, 'Hedera account should be created');
});

Then(/^the user should be inserted into the global users table$/, function () {
  assert.strictEqual(userInsertError, null, 'User should be inserted into users table');
});

Then(/^the user should be inserted into the doctors table$/, function () {
  if (role === 'doctor') {
    assert.strictEqual(roleInsertError, null, 'User should be inserted into doctors table');
  }
});

Then(/^the user should be inserted into the pharmacists table$/, function () {
  if (role === 'pharmacist') {
    assert.strictEqual(roleInsertError, null, 'User should be inserted into pharmacists table');
  }
});

Then(/^the user should be inserted into the labs table$/, function () {
  if (role === 'lab') {
    assert.strictEqual(roleInsertError, null, 'User should be inserted into labs table');
  }
});

Then(/^the system should display a success message$/, function () {
  assert.ok(successMessage.includes('created successfully'), 'Success message should be displayed');
});
