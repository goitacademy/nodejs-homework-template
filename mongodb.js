const { MongoClient } = require("mongodb");

const DB_URI = 'mongodb+srv://vitshev4uk:Shevvit1522qwer@cluster1.rho0ldd.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(DB_URI);

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("You connected to MongoDB!!!")
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}

run();




