const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://DonKanElion:uSLjnJQGrnxNplk9@cluster0.tio2ex9.mongodb.net/db-contacts";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect success 🚀");
    app.listen(3000, () => {
      console.log("🐝 Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log("Database connect error 🙁", error.message);
    process.exit(1);
  });

// DonKanElion
// uSLjnJQGrnxNplk9

// mongodb+srv://DonKanElion:uSLjnJQGrnxNplk9@cluster0.tio2ex9.mongodb.net/

// mongodb+srv://DonKanElion:uSLjnJQGrnxNplk9@cluster0.tio2ex9.mongodb.net/
