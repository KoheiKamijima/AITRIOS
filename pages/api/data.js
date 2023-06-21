import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.NEXT_PUBLIC_COSMOS_DB_ENDPOINT;
const key = process.env.NEXT_PUBLIC_COSMOS_DB_KEY;
const databaseId = process.env.NEXT_PUBLIC_COSMOS_DB_DATABASE;
const containerId = process.env.NEXT_PUBLIC_COSMOS_DB_CONTAINER;
const client = new CosmosClient({ endpoint, key });

export default async function handler(req, res) {
  try {
    const { resources: items } = await client
      .database(databaseId)
      .container(containerId)
      .items.query("SELECT * from c")
      .fetchAll();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from Cosmos DB" });
  }
}
