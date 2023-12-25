export const handleSaveError = (error, data, next) => {
    error.status = 400;
    next();
};

export const addUpdateDocument = function (next) {
    this.options.new = true;
    next();
}; 