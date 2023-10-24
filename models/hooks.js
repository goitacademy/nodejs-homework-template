export const handlerSaveError = (error, data, next) => {
    error.status = 400;
    next();
}

export const runValidatorsAtUpdate = function (next) {
    this.options.runValidators = true;
    next();
}