import dotenv from "dotenv";
import {
  Client,
  AccountId,
  PrivateKey,
} from "@hashgraph/sdk";
import createTopic from "./createTopic"; // Adjust the path if needed
import { submitMedicalHash,checkHashExistence } from "./submitMessage";

dotenv.config();

async function main() {
  const client = Client.forTestnet().setOperator(
    AccountId.fromString(process.env.MY_ACCOUNT_ID!),
    PrivateKey.fromString(process.env.MY_PRIVATE_KEY!)
  );

  await createTopic(client);

  const recordHash = "ae4391f3b0e82f..." // SHA-256, IPFS CID, etc. exemple

  await submitMedicalHash(client, process.env.TOPIC_ID!, recordHash);

   const exists = await checkHashExistence(process.env.TOPIC_ID!, recordHash);
   console.log(`Hash exists: ${exists}`);
}

main();
