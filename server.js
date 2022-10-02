const app = require("./app");
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const DB_HOST =
  "mongodb+srv://Helen:y655ImAmOn4RfE0Z@cluster0.e6psikp.mongodb.net/contacts_reader?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    // app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
