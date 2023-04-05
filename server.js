const mongoose = require("mongoose");
const app = require("./app");

// rodion_myastkowskuy  QmcAvZv28kpbDwgd

const DB_HOST =
  "mongodb+srv://rodion_myastkowskuy:QmcAvZv28kpbDwgd@nodeproject.hi6qenb.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
