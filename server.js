const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config(); 
mongoose.set("strictQuery", true);

const { HOST_URI, PORT = 3000} = process.env;

mongoose
  .connect(HOST_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


