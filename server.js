import mongoose from "mongoose";
import app from "./app.js";
import { error } from "console";

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// --------------------
// import { DB_HOST } from "./config.js";
// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log(
//         "Database connection successful. Server running. Use our API on port: 3000"
//       );
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch((error) => console.log(error.message));

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
// export const DB_HOST =
//   "mongodb+srv://SIryna:rPogUSGbSIQ9m4Yc@cluster0.2osqoz3.mongodb.net/my-ira-contacts?retryWrites=true&w=majority";
