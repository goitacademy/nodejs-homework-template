const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// MONGO_URL =
//   "mongodb+srv://Sanin:Sanin1992@contact-book-db.dd68ivs.mongodb.net/";
//
// це для ментора для перевірки

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(process.env.PORT || 3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
