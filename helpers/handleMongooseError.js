// міделвара яка оброблює статус помилки
const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports = handleMongooseError;
