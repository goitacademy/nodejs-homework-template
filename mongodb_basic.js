const dotenv = require("dotenv");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGO_NAME;

const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  //   await collection.insertOne({
  //     name: {
  //       type: String,
  //       required: [true, "Set name for contact"],
  //     },
  //     email: {
  //       type: String,
  //     },
  //     phone: {
  //       type: String,
  //     },
  //     favorite: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   });
  //   for (let i = 0; i < 5; i++) {
  //     const number = i + 1;
  //     await collection.insertOne({
  //       name: `user${number}`,
  //       age: number,
  //       ageStr: `${number}`,
  //     });

  //   }
  //   console.log(await collection.find({ age: { $gte: 2, $lte: 4 } }).toArray());

  //   console.log(await collection.find().sort({ age: "desc" }).toArray());
  console.log(
    await collection.find().skip(2).limit(2).sort({ age: "asc" }).toArray()
  );
  console.log("finished");
  //  console.log(
  //     await collection.findOne({ _id: new ObjectId("621120b923873a2f4c8f3213") })
  //   );
}

main();
