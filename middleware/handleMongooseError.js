// ЧОМУ не працює? в запиті все одно status 500

const handleMongooseError = (error, data, next) => {
  console.log("1234");
  error.status = 400;
  next();
};

module.exports = { handleMongooseError };
