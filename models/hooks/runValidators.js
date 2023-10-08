const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = runValidatorsAtUpdate;
