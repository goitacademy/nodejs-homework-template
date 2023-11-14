const HttpError = (status, message) => {
  // Фукція обробник помилок
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
