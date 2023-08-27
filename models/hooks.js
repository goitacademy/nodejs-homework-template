const handleValidateError = (error, data, next) => {
  error.status = 400;
  next();
};

const runUpdateValidators = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = {
  handleValidateError,
  runUpdateValidators,
};
