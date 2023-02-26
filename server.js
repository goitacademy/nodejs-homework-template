const app = require("./app");

const mongoose = require("mongoose");

  // console.log(process.env);
 const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);

// console.log(DB_HOST)
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(7070, () => {
      console.log(`Server running. Use our API on port 7070`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
