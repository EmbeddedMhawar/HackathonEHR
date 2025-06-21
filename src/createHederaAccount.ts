import dotenv from "dotenv";
import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountId,
  AccountBalanceQuery,
  Hbar,
} from "@hashgraph/sdk";
dotenv.config();
const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID!);
const MY_PRIVATE_KEY = PrivateKey.fromStringED25519(
  process.env.MY_PRIVATE_KEY!
);

let client = Client.forTestnet().setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

export async function createHederaAccount() {
  const accountPrivateKey = PrivateKey.generateECDSA();
  const accountPublicKey = accountPrivateKey.publicKey;

  const txCreateAccount = new AccountCreateTransaction()
    .setKey(accountPublicKey)
    .setInitialBalance(new Hbar(1))
    .freezeWith(client);

  const txCreateAccountResponse = await txCreateAccount.execute(client);
  const receiptCreateAccountTx = await txCreateAccountResponse.getReceipt(
    client
  );
  const accountId = receiptCreateAccountTx.accountId;

  console.log("✅ Account Created:", accountId?.toString());

  return {
    accountId: accountId?.toString(),
    privateKey: accountPrivateKey.toString(),
    publicKey: accountPublicKey.toString(),
  };
}
