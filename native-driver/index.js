const { MongoClient } = require("mongodb");
const DB_URI = `mongodb+srv://student:49idisio@cluster0.gqtrbvv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(DB_URI);

async function run() { 
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}
run();