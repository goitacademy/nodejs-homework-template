export const handleSaveError = (error, data, next) => {
    const { name, code } = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    next();
};

export const preUpdate = function (next) {
    this.getOptions.new = true;
    this.getOptions.runValidators = true;
    next();
};