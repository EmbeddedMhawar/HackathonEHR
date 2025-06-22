import { Client, TopicCreateTransaction } from "@hashgraph/sdk";

async function createTopic(client: Client): Promise<string> {
  const tx = await new TopicCreateTransaction().execute(client);
  const receipt = await tx.getReceipt(client);

  if (!receipt.topicId) {
    throw new Error("Failed to get topic ID from transaction receipt.");
  }

  const topicId = receipt.topicId.toString();
  console.log("🆕 Topic created:", topicId); // This line already exists, confirming it fulfills the request.
  return topicId;
}

export default createTopic;