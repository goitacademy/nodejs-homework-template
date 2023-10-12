const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

module.exports = { handleSaveError, runValidatorsAtUpdate };
