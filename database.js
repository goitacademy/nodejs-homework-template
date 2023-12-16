import { connect as _connect } from 'mongoose';
import 'dotenv/config';

const uriDb = process.env.DATABASE_URL;

const connect = async () => {
  if (!uriDb) {
    console.error('no db secret');
    process.exit(1);
  }

  await _connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Database connection successful'))
    .catch((err) => {
      console.log(`Database connection failed. Error message: ${err.message}`);
      process.exit(1);
    });
};

export default connect;
