export const handleSaveError = (error, data, next) => {
    error.status = 400;
    error.message = 'missing field favorite';
    next();
};

export const handleUpdateValidate = function (next) {
    this.options.runValidators = true;
    next();
};