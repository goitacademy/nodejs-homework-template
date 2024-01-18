const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const contactRoutes = require("./routes/api/contacts.routes");

const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(process.env.DB_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use("/api", contactRoutes);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error while establishing connection: [${error}]`);
    process.exit(1);
  });
module.exports = app;
