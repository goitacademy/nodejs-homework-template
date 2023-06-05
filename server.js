const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST = "mongodb+srv://Vastasika:QXVyX9gSJB41waJB@cluster0.j6my8ps.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
})
  .catch(error => {
    console.log(error.message);
    process.exit(1);
})


