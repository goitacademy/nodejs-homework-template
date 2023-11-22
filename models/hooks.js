export const handleSaveError = (error, data, next) => {
  error.status = 404;
  next();
};

export function enableUpdateOptions(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
}
