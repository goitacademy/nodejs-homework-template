const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

// const db_host =
//   "mongodb+srv://root:GoItRootPass2021@cluster0.iw5ij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(process.env.DB_HOST_REMOTE);

module.exports = mongoose;
