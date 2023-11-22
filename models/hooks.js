export const handlerSaveError = (err, data, next) => {
  err.status = 400;
  next();
};

export const preUpdate = function (next) {
  this.options.new = true;
  this.options.runValidator = true;
  next();
};
