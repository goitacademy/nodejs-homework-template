const app = require('./app');
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 4000;
const uriDb = process.env.DATABASE_URL;
const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./config-passport')


connection
  .then(() => {
    console.log("OK");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
