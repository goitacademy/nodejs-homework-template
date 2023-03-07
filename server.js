const moggoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Serhyy:DtsYGb9zWsDbHvW4@cluster0.tojr5fz.mongodb.net/db-contacts?retryWrites=true&w=majority";

moggoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
