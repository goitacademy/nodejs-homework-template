// Створюється і повертається новий обєкт, тому з великої букви:

const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error; // повертаємо помилку зі статусом
};

module.exports = HttpError;
