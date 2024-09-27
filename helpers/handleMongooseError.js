const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  // При дублі видаємо помилку 409
  const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  error.status = status; // ставимо статус помилки, т. як mongoose не ставить його
  next();
}

module.exports = handleMongooseError;