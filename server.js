const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Valeriia:WviCczgi2JDHXCJ5@atlascluster.mc8y239.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
