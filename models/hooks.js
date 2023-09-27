export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const runValidateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
