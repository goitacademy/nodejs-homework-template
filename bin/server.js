const app = require('../app');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

const connects = async () => {
  const client = await MongoClient.connect(DB_URL);
  const db = client.db('db-contacts');

  const Contacts = db.collection('contacts');

  const contactsArr = await Contacts.findOne({ name: 'Elon Musk' });

  console.log(contactsArr);
  client.close();
};

connects();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
