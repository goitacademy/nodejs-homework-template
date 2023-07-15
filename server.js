const mongoose = require('mongoose');
const app = require('./app');
const DB_HOST = "mongodb+srv://Yaroslav:0442062697Yh@cluster0.zbgpvpo.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000)
})
.catch(error => {console.log(error.message);
  process.exit(1)}
  )
