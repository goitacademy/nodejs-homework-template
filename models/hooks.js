const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const runValidateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = { handleSaveError, runValidateAtUpdate };
