const createError = require("http-errors");

const handleMongooseError =(error, data, next) => {
  console.log('error', error);
  next(createError(400, "missing field favorite"))
 
};

module.exports = handleMongooseError;