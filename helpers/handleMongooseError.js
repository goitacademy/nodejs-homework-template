// міделвара яка оброблює статус помилки
const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;

//  встановлюємо статус помилки при дублюванні поля email - при дублюванні поля статус 409, у всіх інших випадках статус 400
