const app = require("./app");
const mongoose = require("mongoose");
const {HOST_DB, PORT} = require("./config");
const db = mongoose.connect(HOST_DB);

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});

// const start = async () => {
//   try {
//     mongoose.connect(HOST_DB);
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server with error: ", error.message);
//     process.exit(1);
//   }
// };

// start();
