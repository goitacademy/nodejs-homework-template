const handleMongooseError = (error, data, next) => {
  error.status = 400;

  next();
};

module.exports = handleMongooseError;

//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;

//   next();
// };

// module.exports = handleMongooseError;
