const app = require("./app");
const mongoose = require("mongoose");
const {DB_HOST} = require("./config")

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });


mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000, function () {
      console.log(`Server running. Use our API on port: 3000`);
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
  });
