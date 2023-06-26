// const createError = require("http-errors");

const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  const status =
    name === "MongoServerError" && code === 11000 ? 409 : 400;
        // "Помилка від Joi або іншої бібліотеки валідації");
 error.status = status;
  next();
};

module.exports = handleMongooseError;
