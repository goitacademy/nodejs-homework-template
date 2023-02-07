const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
