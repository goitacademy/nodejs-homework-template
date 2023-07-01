const mongoose = require("mongoose");
const app = require('./app');

const DP_HOST = "mongodb+srv://elenalx:yana0309AYE@cluster0.rupfrxv.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DP_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  
  });


