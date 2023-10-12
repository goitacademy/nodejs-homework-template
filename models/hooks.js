export const handleSaveError = (error, data, next) => {
    const { name, code } = error;
    console.log(name)
    console.log(code)
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    next();
}

export const runValidatorsAtUpdate = function (next) {
    this.options.runValidators = true;
    this.options.new = true;
    next();
}