const handleMongooseError = (error, _, next) => {
  error.status = 400;
  console.log(`status: ${error.status}, message: ${error.message}  `);
  next();
};

module.exports = handleMongooseError;
