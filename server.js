import app from "./app.js";
// import mongoose from "module";
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log("Server running. Use our API on port:", PORT);
});

// const DB_HOST =
//   "mongodb+srv://olga_olga:<password>@cluster0.plzu3r6.mongodb.net/contacts?retryWrites=true&w=majority";

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app1.listen(PORT, () => {
//       console.log("Server running. Use our API on port: 3000");
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });
