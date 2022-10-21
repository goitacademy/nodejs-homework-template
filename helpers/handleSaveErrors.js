const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  console.log(error);
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  console.log(error.status);
  next();
};

module.exports = handleSaveErrors;
