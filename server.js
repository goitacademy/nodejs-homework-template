// const mongoose = require("mongoose");
const app = require("./app");
const { dbConnection } = require("./utils");

require("dotenv").config();
require("colors");

const { DEV_SERVER_PORT = 3000 } = process.env;

// const HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.domin4s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// mongoose.set("strictQuery", true);

dbConnection();

app.listen(DEV_SERVER_PORT, () => {
  console.log(
    `Server running. Use our API on port: ${DEV_SERVER_PORT}`.black
      .bgBrightGreen
  );
});

// mongoose
//   .connect(DB_HOST)
//   .then(() =>
//     app.listen(DEV_SERVER_PORT, () => {
//       console.log(
//         `Server running. Use our API on port: ${DEV_SERVER_PORT}\n Data base connected`
//           .black.bgBrightGreen
//       );
//     })
//   )
//   .catch((error) => {
//     console.log(error.message.black.bgBrightRed);
//     process.exit(1);
//   });
