const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
//hw3
