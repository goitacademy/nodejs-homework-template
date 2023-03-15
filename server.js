const mongose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongose.set("strictQuery", true);

mongose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
