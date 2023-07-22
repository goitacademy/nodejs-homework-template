export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const validateAtUpdate = (next) => {
  this.getOptions.runValidatros = true;
  next();
};
