const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);

    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
