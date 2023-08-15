const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const contactRoutes = require("./routes/contacts.routes");

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.DATABASE_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/contacts", contactRoutes);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error while establishing connection: [${err}]`);
    process.exit(1);
  });
