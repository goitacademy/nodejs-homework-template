const app = require('../app');
const mangoose = require('mongoose');

require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

mangoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
