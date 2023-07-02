const HttpErrors = (status, message) => {
  const error = new Error(message); // Створення нового об'єкта помилки з переданим повідомленням
  error.status = status; // Присвоєння статусу помилки до властивості "status" об'єкта помилки
  return error; // Повернення об'єкта помилки
};

module.exports = HttpErrors;
