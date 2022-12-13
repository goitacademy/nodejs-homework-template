const { connect } = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

(async () => {
  try {
    await connect(DB_HOST);
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
