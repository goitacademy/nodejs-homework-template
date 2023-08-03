const app = require('./app');
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
