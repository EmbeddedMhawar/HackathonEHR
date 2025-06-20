import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';

// ##################################################################
// # Steps from PatientDataSharing.feature
// ##################################################################

Given(/^the EHR platform is connected to the Hedera network$/, function () {
});

Given(/^Dr\. Smith is a registered and verified doctor with the Hedera account ID "([^"]*)"$/, function (accountId: string) {
  assert.strictEqual(accountId, '0.0.12345', 'Account ID should be 0.0.12345');
});

Given(/^Alex is a registered patient with the Hedera account ID "([^"]*)"$/, function (accountId: string) {
  assert.strictEqual(accountId, '0.0.67890', 'Account ID should be 0.0.67890');
});

Given(/^Alex has a previous medical record stored and encrypted off-chain:$/, function (dataTable: DataTable) {
});

Given(/^Alex has not previously granted access to Dr. Smith$/, function () {
});

Given(/^Alex is at a consultation with Dr. Smith$/, function () {
});

When(/^Alex presents his personal QR code from the EHR web app$/, function () {
});

When(/^Dr\. Smith scans the QR code using the platform's doctor portal$/, function () {
});

When(/^the system prompts Alex on his app to grant access to Dr. Smith$/, function () {
});

When(/^Alex approves the access request for his full record history$/, function () {
});

Then(/^Dr\. Smith's dashboard should successfully display Alex's medical records$/, function () {
});

Then(/^Dr\. Smith should be able to view the diagnosis record for "([^"]*)"$/, function (recordDetails: string) {
});

Then(/^a new message should be submitted to the Hedera Consensus Service \(HCS\)$/, function () {
});

Then(/^the HCS message log for Alex's topic should contain a new immutable entry confirming:$/, function (dataTable: DataTable) {
});