const { MongoClient } = require('mongodb');


const url = 'mongodb+srv://mirzakhanovamari:testcluster@cluster0.icwx1gn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'db-contacts';


const connectMongo = async () => {
    await client.connect();
    console.log('Database connection successful');
    const db = client.db(dbName);
    
    const collection = db.collection('contacts');
    return collection;
   
};

connectMongo()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


module.exports = { connectMongo };