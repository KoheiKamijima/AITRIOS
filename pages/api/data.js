import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.NEXT_PUBLIC_COSMOS_DB_ENDPOINT;
const key = process.env.NEXT_PUBLIC_COSMOS_DB_KEY;
const databaseId = process.env.NEXT_PUBLIC_COSMOS_DB_DATABASE;
const containerId = process.env.NEXT_PUBLIC_COSMOS_DB_CONTAINER;
const client = new CosmosClient({ endpoint, key });

export default async function handler(req, res) {
  try {
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Assume `timestamp` is the field that determines how recent a data point is.
    const query = {
      query: "SELECT * FROM c ORDER BY c.timestamp DESC",
    };

    const { resources: items } = await container.items.query(query).fetchAll();

    // Return the latest data point
    if (items.length > 0) {
      res.status(200).json(items[0]);
    } else {
      res.status(404).send("No data found.");
    }
    // const { resources: items } = await client
    //   .database(databaseId)
    //   .container(containerId)
    //   .items.query("SELECT * from c")
    //   .fetchAll();

    // res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from Cosmos DB" });
  }
}
