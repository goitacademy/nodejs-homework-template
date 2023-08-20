// const mongoose = require("mongoose");
// const app = require("./app");


// const DB_HOST = 'mongodb+srv://Okeksandr:CSIjqcS3tIOUfDob@cluster0.s6wvvm5.mongodb.net/db-contacts.contacts?retryWrites=true&w=majority';

// mongoose.set('strictQuery', true);

// mongoose.connect(DB_HOST)
// .then(() => {
//   app.listen(3000)
// })
// .catch(error => {
//   console.log(error.message);
//   process.exit(1);
// })  



const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
