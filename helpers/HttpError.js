// функція для створення об'єктів помилок
const HttpError = (status, message) => {
  const error = new Error(message); // створюємо новий об'єкт помилки який ініціалізується переданим повідомленням
  error.status = status; // присвоєння статусу помилки до властивості "status" об'єкта помилки
  return error; // повертаємо об'єкт помилки з функції HttpError
};

module.exports = HttpError;
