const messagesList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message); // Створення нового об'єкта помилки з переданим повідомленням
  error.status = status; // Присвоєння статусу помилки до властивості "status" об'єкта помилки
  return error; // Повернення об'єкта помилки
};

module.exports = HttpError;
