import dotenv from "dotenv";
import {
  Client,
  AccountId,
  PrivateKey,
} from "@hashgraph/sdk";
import { submitMedicalHash,checkHashExistence } from "./submitMessage";

import { sha256HashFile } from "./hashUtil";

dotenv.config();

async function main() {
  const client = Client.forTestnet().setOperator(
    AccountId.fromString(process.env.MY_ACCOUNT_ID!),
    PrivateKey.fromString(process.env.MY_PRIVATE_KEY!)
  );

  const filePath = "C:/Users/user/Downloads/amine.pdf";  // HERE U PUT THE PATH OF THE FILE (PDF)

  const fileHash = sha256HashFile(filePath);

  console.log("Document SHA-256 hash:", fileHash);


  await submitMedicalHash(client, process.env.TOPIC_ID!, fileHash);


  await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay

   const exists = await checkHashExistence(process.env.TOPIC_ID!, fileHash);
   console.log(`Hash exists: ${exists}`);
}

main();
