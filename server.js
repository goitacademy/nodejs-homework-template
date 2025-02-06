const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
