const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Inga:@$9r76UQ2Wnz$wq@cluster0.xp9xyif.mongodb.net/online_collection?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connect"))
  .catch(error => console.log(error.message))

 
