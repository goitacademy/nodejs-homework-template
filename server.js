const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST='mongodb+srv://09022023Rik:09022023Rik@cluster0.f0abo8p.mongodb.net/contacts_reader?retryWrites=true&w=majority', PORT = 4500 } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((er) => {
    console.log(`Error-${er.message}`);
    process.exit(1);
  });
