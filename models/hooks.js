const handleSaveError = (error, data, next) => {
  error.status = 400;
  console.log("er", error.status);
  next();
};

const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

module.exports = {
  handleSaveError,
  runValidatorsAtUpdate,
};
