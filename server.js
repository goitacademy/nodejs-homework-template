const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./config");
const { PORT = 4000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
// const mongoose = require("mongoose");
// const DB_HOST = "mongodb + srv://Iryna:551159@cluster0.tdaj9.mongodb.net/contacts_reader?retryWrites=true&w=majority";
// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connection successful")
//   .catch(error=> error.message)
//   )