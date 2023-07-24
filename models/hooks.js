// Assigns a status code to the error object
// (since[Model.create] does not assign one on save error):
export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handleUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};
