export const onSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const addUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
