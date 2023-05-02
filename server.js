const app = require("./app");

const mongoose = require("mongoose");
const DB_HOST = process.env.DB_HOST;   // require('./config.js'); додали в render.com => enviranment

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
    // закрити з невідомою помилкою
  });
