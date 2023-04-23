require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
