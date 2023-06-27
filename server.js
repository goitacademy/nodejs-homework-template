const { default: mongoose } = require("mongoose");
const app = require("./app");
const fs = require("fs");
const tmpFolder = "./tmp";

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

require("dotenv").config();
const uriDb = process.env.DB_HOST;

mongoose
  .connect(uriDb)
  .then(() => {
    if (!fs.existsSync(tmpFolder)) {
      fs.mkdirSync(tmpFolder);
    }
    console.log("You're connected");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
