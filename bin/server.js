const mongoose = require("mongoose");
const app = require("../app");

// const PORT = process.env.PORT || 3001;
const { DB_HOST, PORT = 3000 } = process.env;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
