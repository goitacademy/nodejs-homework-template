export const handleSaveError = (error, date, next)=>{
error.status = 400;
  next();
}

export const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
}