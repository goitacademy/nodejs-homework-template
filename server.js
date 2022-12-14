const app = require('./app');
const mongoose = require('mongoose');

const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
