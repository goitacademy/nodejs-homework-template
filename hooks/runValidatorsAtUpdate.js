export const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
