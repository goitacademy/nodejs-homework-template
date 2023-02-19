const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const { PORT = 3005, MONGO_DB_URL } = process.env;

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error: ${err.message}`);
    process.exit(1);
  });
