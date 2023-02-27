const mongoose = require("mongoose");

const app = require("./app");

// const PORT = 3000

// app.listen(3000, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
