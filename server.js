const app = require('./app');

const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://VLad:QBTArdlSnhxpwUTN@cluster0.xag0r1t.mongodb.net/db-contacts?retryWrites=true&w=majority';
const PORT = '3000';

// const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(app.listen(PORT, () => {
  console.log("Database connection successful");
})
).catch(error => {
  console.log(error.message);
  process.exit(1);
});


// const app = require('./app');

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });