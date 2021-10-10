// const app = require("../app");
// const db = require("../model/db");

// const PORT = process.env.PORT || 3000;

// db.then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running. Use our API on port: ${PORT}`);
//   });
// }).catch((err) => {
//   console.log(`Server not running. Error message: ${err.message}`);
//   process.exit(1);
// });

const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });





// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = require("../app");

// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose
//   .connect(DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     });
//   })

//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
