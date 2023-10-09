const { MongoClient } = require("mongodb");

const username = encodeURIComponent("serarfima");
const password = encodeURIComponent("LcmxT7HH7xoyVPt7");
const cluster = "ClusterTI";
const authSource = "admin"; // або інша база, яку ви використовуєте для автентифікації
const authMechanism = "DEFAULT"; // або інше значення, залежно від налаштувань вашого кластера

const uri =
  `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("9");
    const collection = database.collection("23");

    return { client, database, collection };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;