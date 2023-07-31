const handleMongooseError = (error, data, next) => {
    // name -MongooseServerError, code - 11000 название ошибки . При них ошибка 409 в друг случаях 400
    const { name, code } = error;
const status = (name === "MongooseServerError" && code === 11000) ? 409 : 400
    error.status = status;
    next();
  };
  
  module.exports = handleMongooseError;
