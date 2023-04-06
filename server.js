const mongoose = require("mongoose")

const app = require('./app')
// jeP6KummkvXgTjK5 
const DB_HOST = "mongodb+srv://bachynckyiandrii:jeP6KummkvXgTjK5@cluster0.zj02p9g.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)  
  });

