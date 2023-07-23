export const handleSaveError = (error, data, next) => {
    error.status = 400;
    next()
  }

  export const isValidateAtUpdate = function(next){
    this.options.runValidators = true;
    next();
  }