const app = require('./app');
const mongoose = require('mongoose');
const chalk = require('chalk');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(chalk.green('Database connection successful'));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
