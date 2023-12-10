import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST, PORT } = process.env; // Зі змінних оточення беремо змінні  DB_HOST, PORT

mongoose // За допомогою бібліотеки mongoose створюємо зєднання з базою даних
  .connect(DB_HOST) // За допомого методу connect створюємо зєднання з базою даних куди передаємо дані зі зміних оточення DB_HOST
  .then(() => {
    // Якщо зєднання відбулось успішно методом listen запускаємо сервер
    // Першим аргументом передаємо номер порту PORT
    // Другим аргументом передаємо колбек функцію в якій прописуємо "Database connection successful"
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    // Якщо сталась помилка виводимо її в консоль
    console.log(error.message);
    // За допомогою process.exit(1) завершуємо процес зєднання
    process.exit(1);
  });
