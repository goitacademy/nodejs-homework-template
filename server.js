const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://iryna220:M7skH5S02Xq3dTab@cluster0.gro6ykl.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
