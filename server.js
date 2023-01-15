const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { PORT = 3000, DB_HOST } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
  })

  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })

  .catch((error) => {
    console.log(error.message);
    // закрити всі прцеси, що не використовуються. обробка помилки
    process.exit(1);
  });
