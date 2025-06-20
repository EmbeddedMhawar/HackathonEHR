import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';


Given(/^the EHR platform is connected to the Hedera network$/, function () {
});

Given(/^Sarah is a new user on the platform's registration page$/, function () {
});

Given(/^Alex is a registered patient with the Hedera account ID "([^"]*)" and email "([^"]*)"$/, function (accountId: string, email: string) {
  assert.strictEqual(accountId, '0.0.67890', 'Account ID should be 0.0.67890');
  assert.strictEqual(email, 'alex@example.com', 'Email should be alex@example.com');
});

Given(/^a new user is on the platform's registration page$/, function () {
});

When(/^she provides the following registration details:$/, function (dataTable: DataTable) {
});

When(/^they provide the following registration details:$/, function (dataTable: DataTable) {
});

When(/^she submits the registration request$/, function () {
});

When(/^they submit the registration request$/, function () {
});

Then(/^a new platform account should be successfully created for "([^"]*)"$/, function (email: string) {
});

Then(/^a new Hedera account should be created and associated with her platform account$/, function () {
});

Then(/^her patient dashboard should display her new unique Hedera Account ID$/, function () {
});

Then(/^the displayed Hedera Account ID must be in the valid format of "([^"]*)"$/, function (format: string) {
});

Then(/^they should be shown an error message indicating the email is already registered$/, function () {
});

Then(/^no new Hedera account should be created for this request$/, function () {
});
