const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 3000;

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Database connection successful on the port: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
