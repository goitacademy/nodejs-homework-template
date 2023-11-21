const handelSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const runValidators = function (next) {
  this.options.runValidators = true;
  next();
};
export default { handelSaveError, runValidators };
