const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const mongoose = require("mongoose");
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
