import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { Client, AccountId, PrivateKey } from '@hashgraph/sdk';
import { submitMedicalHash, checkHashExistence } from '../../src/submitMessage';
//import createTopic from '../../src/createTopic';
import dotenv from 'dotenv';

dotenv.config();

let client: Client;
let recordHash: string;
let submitResult: any;
let hashExists: boolean;
//let topicId: string;

Given(/^the EHR platform is connected to the Hedera network$/, async function () {
  const accountId = process.env.MY_ACCOUNT_ID;
  const privateKey = process.env.MY_PRIVATE_KEY;

  if (!accountId || !privateKey) {
    throw new Error(
      'Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be set.'
    );
  }

  client = Client.forTestnet().setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));
  assert.ok(client, 'Client should be initialized');
  
  // Create a new topic for this test run and log its ID
  //topicId = await createTopic(client);
  //console.log(`🆕 Using dynamically created topic ID: ${topicId}`);
});

Given(/^a medical record is hashed using a cryptographic hash function$/, function () {
  // For test, use a static hash string (in real use, hash the record)
  
  // This is the SHA-256 hash of the string "abc"
  recordHash = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
  assert.ok(recordHash, 'Record hash should be set');
});

When(/^the hash is submitted to the Hedera Consensus Service topic$/, async function () {
  submitResult = await submitMedicalHash(client, process.env.TOPIC_ID!, recordHash);
  assert.ok(process.env.TOPIC_ID, 'Topic ID should be set');
  assert.ok(submitResult !== undefined, 'Submission should return a result');
});

Then(/^the transaction receipt should confirm the message was successfully submitted$/, function () {
  // Now we can assert on the actual status from the receipt
  assert.strictEqual(submitResult.status.toString(), 'SUCCESS', 'Transaction should be successful');
});

Given(/^a hash of a medical record$/, function () {
  // This is the SHA-256 hash of the string "abc"
  recordHash = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
  assert.ok(recordHash, 'Record hash should be set');
});

When(/^the system queries the Hedera Mirror Node for the hash in the specified topic$/, async function () {
  hashExists = await checkHashExistence(process.env.TOPIC_ID!, recordHash);
});

Then(/^the system should confirm the hash exists, proving the record's authenticity$/, function () {
  console.log(`Hash existence check result: ${hashExists}`);
  assert.strictEqual(hashExists, true, 'Hash should exist on Hedera');
});
