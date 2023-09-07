const mongoose = require("mongoose");

require("dotenv").config(); // Добавляем для загрузки переменных окружения

const app = require("./app");

const DB_HOST =
  "mongodb+srv://NRie-23:AhTK002KYJ07D9pA@cluster0.qiigtmy.mongodb.net/contacts?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  });
