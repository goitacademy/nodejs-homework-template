const mongoose = require("mongoose");

const app = require("./app");
const { DB_HOST, PORT } = process.env;
// const { DB_HOST, PORT } = require("./config");
// const DB_HOST =
//   "mongodb+srv://Olena:314223@cluster0.ic2uyyp.mongodb.net/My-bd?retryWrites=true&w=majority";
// const PORT = 3000;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("good");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
