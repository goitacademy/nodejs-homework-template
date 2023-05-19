const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
mongoose.Promise = global.Promise;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
  })


