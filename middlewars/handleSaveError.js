const handleSaveError = (error, data, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    error.status = 409;
    error.message = "Contact is already in the collection.";
  } else {
    error.status = 400;
  }

  next();
};

module.exports = handleSaveError;
