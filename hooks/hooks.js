export const handleSaveError = (error, data, next)=>{
    error.status = 404;
    next()
}

export const runValidators = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};