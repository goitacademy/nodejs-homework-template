const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const contactsRouter = require("./routes/api/contacts.routes");

const PORT = process.env.PORT || 4000;
const uriDb = process.env.DATABASE_URL;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api", contactsRouter);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: [${err}]`);
    process.exit(1);
  });
