const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_HOST, {
    dbName: "db-contacts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, async () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error while establishing connection: [${err}]`);
    process.exit(1);
  });
