import { Client, TopicCreateTransaction } from "@hashgraph/sdk";

async function createTopic(client: Client): Promise<string> {
  const tx = await new TopicCreateTransaction().execute(client);
  const receipt = await tx.getReceipt(client);
  const topicId = receipt.topicId?.toString();

  console.log("🆕 Topic created:", topicId);
  return topicId!;
}

export default createTopic;