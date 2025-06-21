import fetch from "node-fetch";
import { Client, TopicMessageSubmitTransaction } from "@hashgraph/sdk";

export async function submitMedicalHash(client: Client, topicId: string, hash: string) {
  const submitTx = await new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(hash)
    .execute(client);

  const receipt = await submitTx.getReceipt(client);
  console.log("✅ Message submitted. Status:", receipt.status.toString());
}

export async function checkHashExistence(
  topicId: string,
  targetHash: string,
  mirrorNodeUrl = "https://testnet.mirrornode.hedera.com"
): Promise<boolean> {
  let next: string | null = null;

  do {
    const url: string = next
      ? next
      : `${mirrorNodeUrl}/api/v1/topics/${topicId}/messages?limit=50&order=asc`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.statusText}`);
    }

    const json = await res.json() as { messages: { message: string }[], links: { next: string | null } };

    for (const msg of json.messages) {
      const messageString = Buffer.from(msg.message, "base64").toString("utf-8");
      if (messageString === targetHash) {
        return true;
      }
    }

    next = json.links.next;
  } while (next);

  return false;
}


