// эта функция вызывается в цепочке middleware при обработке ошибки, она устанавливает статус 400 и передает управление дальше, что может быть полезным для единообразной обработки ошибок на уровне приложения.

const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  // console.log("error name", name);
  // console.log("error code", code);

// !Если пытаются добавить повторяющееся значение в базу данных, выведи ошибку 409. Во всех остальных случаях возвращай ошибку 400.
  const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;

  error.status = status;
  next();
};

module.exports = handleMongooseError;
