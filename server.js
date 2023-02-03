const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = require("./app");
mongoose.set("strictQuery", true);
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
