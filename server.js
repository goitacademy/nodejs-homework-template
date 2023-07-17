const express = require("express");
const app = express();
const connectDB = require("./routes/api/db");
const routes = require("./routes/api/contacts");

connectDB();

app.use("/api/contacts", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
