const handleSaveError = (error, data, next) => {
  const { code, name } = error;

  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

const handleUpdValidate = function (next) {
  this.getOptions.runValidators = true;

  next();
};

module.exports = {
  handleSaveError,
  handleUpdValidate,
};
