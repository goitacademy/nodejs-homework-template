const mongoose = require("mongoose");

// const app = require('./app');

// const { DB_HOST } = process.env;
// const { PORT } = process.env;

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

const DB_HOST = "mongodb+srv://zagorskyura:iQGERVi79iiQVJNl@cluster0.sqgu1xp.mongodb.net/db-contacts?retryWrites=true&w=majority"
 mongoose.connect(DB_HOST)