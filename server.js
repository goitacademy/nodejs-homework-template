const mongoose = require("mongoose");

const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose.connect(
  "mongodb://mongodb+srv://rasinoleg3:wvFaCB0uwsGGuCH7@cluster0.32p2cwd.mongodb.net/db-contacts"
);
