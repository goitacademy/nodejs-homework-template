import multer from "multer"; // Бібліотека для збереження файлів
import path from "path"; // Бібліотека для створення шляхів
import { HttpError } from "../helpers/index.js";

const destination = path.resolve("temp"); // Створюємо абсолютний шлях до папки temp за допомогою методу path

// Створюємо функцію яка відповідає за зберігання файлів storage
const storage = multer.diskStorage({
  destination, // Вказуємо шлях до зберігання файлів
  // Вказуємо імя файла
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`; // Створюємо унікальний префікс для назви файла
    const filename = `${uniquePrefix}_${file.originalname}`; // Додаємо префікс до оригінального імені
    cb(null, filename); // Передаємо в колбек null або помилку другим аргументом імя файла
  },
});

// Створюємо функцію яка буде обмежувати розмір файлу
const limits = {
  fileSize: 5 * 1024 * 1024,
};

//Створюємо змінну яка буде вказувати на обмеження файлів
const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop(); // Через split розділяємо назву файлу та розширення
  // Через метод pop повертаємо значення розширення
  if (extention === "exe") {
    // Перевіряємо розширення файлу
    return cb(HttpError(400, "invalid file extention")); // Якщо файл ехе перериваємо виконання функції і відправляємо помилку
  }
  cb(null, true); // Якщо розширення файла Ok викликаємо колбек
};

// Створюємо мідлвару яка за допомогою multer та передаємо в неї налаштування
const upload = multer({
  storage,
  limits,
});

export default upload;
