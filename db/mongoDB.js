const mongoose = require("mongoose");

// URL підключення до бази даних MongoDB Atlas
const dbURL =
  "mongodb+srv://mrmaddarknes:sNI2jv2le4icneK8@vorongorclacter.hsxv0qo.mongodb.net/db-contacts";

// Підключення до бази даних

mongoose
  .connect(dbURL)
  // .then(() => {
  //   console.log(`Підключено до MongoDB Atlas на ${dbURL}`);
  // })
  // .catch(() => {
  //   console.error("Помилка підключення до MongoDB Atlas:", err);
  // });

// Об'єкт з'єднання
const db = mongoose.connection;

// Обробник події, який виконається при успішному підключенні
db.on("connected", () => {
  console.log(`Підключено до MongoDB Atlas на ${dbURL}`);
});

// Обробник події, який виконається при помилці підключення
db.on("error", (err) => {
  console.error("Помилка підключення до MongoDB Atlas:", err);
});

// Обробник події, який виконається при відключенні від бази даних
db.on("disconnected", () => {
  console.log("Відключено від MongoDB Atlas");
});

// Схема моделі для колекції 'contacts'
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

// Створюємо модель 'Contact' на основі схеми
const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  db, // Експортуємо об'єкт з'єднання
  Contact, // Експортуємо модель
};
