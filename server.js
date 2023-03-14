require("dotenv").config();
const app = require("./src/app");
const db = require("./src/db");

const PORT = process.env.PORT || 3000;

db.connectMongo()
  .then(() =>
    app.listen(PORT, () => console.log("Database connection successful"))
  )
  .catch((err) => {
    console.error(`Failed to start server. Error: ${err.message}`);
    process.exit(1);
  });
