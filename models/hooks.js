export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.getOptions.runValidators = true;
  next();
};
