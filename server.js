const mongoose = require("mongoose");
const app = require('./app');

const DB_HOST = "mongodb+srv://Ludmila121:j4KckGfSZG3vPYxl@cluster0.pmymnoc.mongodb.net/Contacts_book?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

/* app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
 */