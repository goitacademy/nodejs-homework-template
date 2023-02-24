const handleMongooseError = (erorr, data, next) =>{
    erorr.status = 400;
  next();
};

module.exports = handleMongooseError;