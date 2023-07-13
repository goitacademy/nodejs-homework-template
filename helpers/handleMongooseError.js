const handleMongooseError = (error, data, next) => {
  error.status = 400; // ставимо статус помилки, т. як mongoose не ставить його
  next();
}

module.exports = handleMongooseError;