const errorMongooseHandler = (error, data, next) => {
<<<<<<< HEAD
    error.status = 400;
    next();
  };
  
  module.exports = errorMongooseHandler;
=======
  error.status = 400;
  next();
};

module.exports = errorMongooseHandler;
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
