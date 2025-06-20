import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';


Given(/^the EHR platform is connected to the Hedera network$/, function () {
  return 'pending';
});

Given(/^Sarah is a new user on the platform's registration page$/, function () {
  return 'pending';
});

Given(/^Alex is a registered patient with the Hedera account ID "([^"]*)" and email "([^"]*)"$/, function (accountId: string, email: string) {
  return 'pending';
});

Given(/^a new user is on the platform's registration page$/, function () {
  return 'pending';
});

When(/^she provides the following registration details:$/, function (dataTable: DataTable) {
  return 'pending';
});

When(/^they provide the following registration details:$/, function (dataTable: DataTable) {
  return 'pending';
});

When(/^she submits the registration request$/, function () {
  return 'pending';
});

When(/^they submit the registration request$/, function () {
  return 'pending';
});

Then(/^a new platform account should be successfully created for "([^"]*)"$/, function (email: string) {
  return 'pending';
});

Then(/^a new Hedera account should be created and associated with her platform account$/, function () {
  return 'pending';
});

Then(/^her patient dashboard should display her new unique Hedera Account ID$/, function () {
  return 'pending';
});

Then(/^the displayed Hedera Account ID must be in the valid format of "([^"]*)"$/, function (format: string) {
  return 'pending';
});

Then(/^they should be shown an error message indicating the email is already registered$/, function () {
  return 'pending';
});

Then(/^no new Hedera account should be created for this request$/, function () {
  return 'pending';
});
