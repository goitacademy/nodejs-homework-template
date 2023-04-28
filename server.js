// const dotenv = require('dotenv')
// const path = require('path')

const connectDB = require("./config");
// const envPath = path.join(__dirname, 'config', '.env')

// dotenv.config({path:envPath})
const app = require("./app");

const {
  // DB_HOST = "mongodb+srv://userDB:WF2tKF2wY5l0ML8O@cluster0.wifylhl.mongodb.net/db-contacts?retryWrites=true&w=majority",
  PORT = 5000,
} = process.env;

connectDB();

// console.log(envPath);
app.listen(PORT, () => {
  console.log(`Database connection successful ${PORT}`);
});

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
