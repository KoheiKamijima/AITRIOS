import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.NEXT_PUBLIC_COSMOS_DB_ENDPOINT;
const key = process.env.NEXT_PUBLIC_COSMOS_DB_KEY;
const databaseId = process.env.NEXT_PUBLIC_COSMOS_DB_DATABASE;
const containerId = process.env.NEXT_PUBLIC_COSMOS_DB_CONTAINER;
const client = new CosmosClient({ endpoint, key });

// export default async function handler(req, res) {
//   try {
//     const database = client.database(databaseId);
//     const container = database.container(containerId);

//     const query = {
//       query: "SELECT * FROM c ORDER BY c.Date_time DESC",
//     };

//     const { resources: items } = await container.items.query(query).fetchAll();

//     console.log(items[0]);
//     // Return the latest data point
//     if (items.length > 0) {
//       res.status(200).json(items[0]);
//     } else {
//       res.status(404).send("No data found.");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching data from Cosmos DB" });
//   }
// }

export default async function handler(req, res) {
  try {
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const query = {
      query: "SELECT TOP 10 * FROM c ORDER BY c.Date_time DESC",
    };

    const { resources: items } = await container.items.query(query).fetchAll();

    console.log(items);
    // Return the latest data points
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).send("No data found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from Cosmos DB" });
  }
}
