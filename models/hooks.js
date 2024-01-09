export const handleSaveError = (error, data, next) => {
    error.status = 400;
    next();
}

export const addUpdateSettings = function(next){
    this.option.new = true;
    this.option.runValidators = true;
    next();
}