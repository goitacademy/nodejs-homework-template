import mongooseService from 'mongoose';
const { connect, connection } = mongooseService;

const db = connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

connection.on('err', err => {
  console.log(`Mongoose connection error: ${err.message}`);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

process.on('SIGINT', async () => {
  connection.close();
  console.log('Connection DB closed');
  process.exit(1);
});

export default db;
