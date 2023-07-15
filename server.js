const mongoose = require("mongoose");

require("dotenv").config();

// const { DB_HOST } = require("./config");
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("./app");

const connectDB = async (DB_HOST, PORT) => {
  try {
    const connectSuccess = await mongoose.connect(DB_HOST);
    if (connectSuccess) {
      app.listen(PORT, () => {
        console.log(
          `Database connection successful. Server running. Use our API on port: ${PORT}`
        );
      });
    }
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
};
connectDB(DB_HOST, PORT);

// mongoose
//   .connect(DB_HOST)
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log("Server running. Use our API on port: 3000");
//     })
//   )
//   .catch((error) => console.log(error.message));