const app = require("./app");

const { Host } = process.env;

const { Port } = process.env;

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(Host)
  .then(() => {
    app.listen(Port, () => {
      console.log(
        `Database connection successful. Use our API on port: ${Port}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
