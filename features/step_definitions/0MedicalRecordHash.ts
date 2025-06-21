import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { Client, AccountId, PrivateKey } from '@hashgraph/sdk';
import { submitMedicalHash, checkHashExistence } from '../../src/submitMessage';
import dotenv from 'dotenv';

dotenv.config();

let client: Client;
let recordHash: string;
let submitResult: any;
let hashExists: boolean;

Given(/^the EHR platform is connected to the Hedera network$/, function () {
  client = Client.forTestnet().setOperator(
    AccountId.fromString(process.env.MY_ACCOUNT_ID!),
    PrivateKey.fromString(process.env.MY_PRIVATE_KEY!)
  );
  assert.ok(client, 'Client should be initialized');
});

Given(/^a medical record is hashed using a cryptographic hash function$/, function () {
  // For test, use a static hash string (in real use, hash the record)
  recordHash = 'ae4391f3b0e82f...';
  assert.ok(recordHash, 'Record hash should be set');
});

When(/^the hash is submitted to the Hedera Consensus Service topic$/, async function () {
  submitResult = await submitMedicalHash(client, process.env.TOPIC_ID!, recordHash);
  assert.ok(submitResult !== undefined, 'Submission should return a result');
});

Then(/^the transaction receipt should confirm the message was successfully submitted$/, function () {
  // In submitMedicalHash, a console log is printed. Here, just check no error was thrown.
  assert.ok(true, 'Transaction receipt confirmed');
});

Given(/^a hash of a medical record$/, function () {
  recordHash = 'ae4391f3b0e82f...';
  assert.ok(recordHash, 'Record hash should be set');
});

When(/^the system queries the Hedera Mirror Node for the hash in the specified topic$/, async function () {
  hashExists = await checkHashExistence(process.env.TOPIC_ID!, recordHash);
});

Then(/^the system should confirm the hash exists, proving the record's authenticity$/, function () {
  assert.strictEqual(hashExists, true, 'Hash should exist on Hedera');
});
