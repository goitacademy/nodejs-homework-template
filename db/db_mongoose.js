require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uriDb = process.env.URI_DB;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on('SIGINT', async () => {
  console.log('Disconnecting from database...');
  const client = await mongoose;
  await client.disconnect();
  process.exit(1);
});

module.exports = connection;
