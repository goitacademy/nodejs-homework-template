const mongoose = require('mongoose');
const app = require('./app')
const { DB_HOST, PORT } = process.env;

// mongoose.set('srictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log("\x1b[94mDatabase connection successful\x1b[0m");
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });