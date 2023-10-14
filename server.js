const mongoose = require('mongoose');

const app = require("./app.js");

//  U1XmmpMOEwO9HXnj

const DB_HOST = "mongodb+srv://Oksana:U1XmmpMOEwO9HXnj@cluster0.oglybn2.mongodb.net/contactsreader?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => 
  {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1)
})
