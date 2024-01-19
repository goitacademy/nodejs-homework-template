const errorMessageList = {
  400: "Bad request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

// Створюється і повертається новий обєкт, тому з великої букви:
const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error; // повертаємо помилку зі статусом
};

module.exports = HttpError;
