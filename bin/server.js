const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

const { PORT = 3000, DB_HOST } = process.env;

/* const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.emw6k.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` */

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
    app.listen(PORT);
  })
  .catch(error => {
    console.log(`Connection error: ${error}`);
    process.exit(1);
  });
