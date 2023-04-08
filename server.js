const mongoose = require("mongoose");

const app = require('./app')
// xDVS8o8JCXOUmW6H

const DB_HOST = "mongodb+srv://ira:xDVS8o8JCXOUmW6H@cluster0.qsijuzb.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
.then(() => app.listen(3000))
.catch(error => console.log(error.message));


