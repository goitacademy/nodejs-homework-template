const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://ania:ania@cluster0.goldnse.mongodb.net/contacts_reader?retryWrites=true&w=majority";

// mongoose.set("strictQurey", true);
mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST).then(() =>
  app
    .listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    }))
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    })

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// })
