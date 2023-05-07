const app = require('./app');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, PORT = 3000, BASE_URL } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT} ${BASE_URL}}`);
    })
  )
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Database connection successful');
});
