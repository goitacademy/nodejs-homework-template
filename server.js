const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://andriiyzlt:8paZJSeAEp5N6fm1@cluster-hw3.q6poqc8.mongodb.net/HW03-MONGODB?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connect success");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
