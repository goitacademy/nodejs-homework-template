const app = require('./app')

const mongoos = require("mongoos");

const DB_HOST = "mongodb+srv://Andrew:Drun4ik7@cluster0.m4uu0ed.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


