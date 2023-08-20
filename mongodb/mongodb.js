const { MongoClient } = require("mongodb");
const DB_URI =
  "mongodb+srv://krinn:pPSjvp7ZsptqplpT@cluster0.4uwpvqd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(DB_URI);
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
