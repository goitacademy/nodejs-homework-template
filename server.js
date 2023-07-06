const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb+srv://alekstitula84:4hc51ZKTZcaVn4Wt@cluster0.tcpnf5h.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });