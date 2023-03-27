const app = require('./app');
const mongoose = require('mongoose');
const { DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Database connection successful`);
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
