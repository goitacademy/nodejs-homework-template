const mongoose = require("mongoose");
const app = require('./app')

const DB_HOST = "mongodb+srv://Andrew:OMQq6xM5H5RRJpiS@cluster0.gsjf7td.mongodb.net/contacts_reader?retryWrites=true&w=majority"

const {PORT = 3000} = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });