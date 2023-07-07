const app = require("./app");
const mongoose = require("mongoose");

const { DB_URL, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URL)
  .then(
    app.listen(PORT, () => {
      console.log(`Server running and database connection successful.`);
    })
  )
  .catch((err) => {
    console.log("Connect error", err.message);
    process.exit(1);
  });
