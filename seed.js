require('dotenv').config();
const { CosmosClient } = require('@azure/cosmos');
const { faker } = require('@faker-js/faker');

// Cosmos DB config
const endpoint = process.env.DB_ENDPOINT;
const key = process.env.DB_KEY;
const databaseId = process.env.DB_ID;
const productContainerId = process.env.PRODUCTS_CONTAINER_ID;
const stockContainerId = process.env.STOCK_CONTAINER_ID;

// console.log(
//   'DB_CREDS',
//   endpoint,
//   key,
//   databaseId,
//   productContainerId,
//   stockContainerId
// );

const client = new CosmosClient({ endpoint, key });

//Test connection
// async function listContainers() {
//   const database = client.database(process.env.DB_ID);
//   const { resources: containers } = await database.containers
//     .readAll()
//     .fetchAll();
//   console.log('Containers:');
//   containers.forEach((container) => {
//     console.log(`- ${container.id}`);
//   });
// }

// listContainers().catch(console.error);

async function seed() {
  const database = client.database(databaseId);
  const productContainer = database.container(productContainerId);
  const stockContainer = database.container(stockContainerId);

  for (let i = 0; i < 20; i++) {
    const id = faker.string.uuid();

    const product = {
      id,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 5, max: 500 }),
    };

    const stock = {
      product_id: id,
      count: faker.number.int({ min: 0, max: 1000 }),
    };

    await productContainer.items.create(product);
    await stockContainer.items.create(stock);

    console.log(`Inserted product ${product.title} and stock (${stock.count})`);
  }

  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Error seeding data:', err.message);
});
