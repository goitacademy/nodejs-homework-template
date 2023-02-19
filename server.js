const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("\x1B[32m Database connection successful");

    app.listen(PORT, () => {
      console.log(
        `\x1B[32m Server running. Use our API on port: \x1B[37m http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });

