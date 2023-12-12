function handleMongooseErr(error, data, next) {
  error.status = 400;
  next();
}

module.exports = handleMongooseErr;

// эта строка создана для нового пуша на гит, потому что чловил глук
