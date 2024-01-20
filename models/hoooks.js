export const handleSaveError =  (error, data, next) => {
    const { name, code } = error;
    console.log(error.name)
    error.status = (name === "MongoServerError" && code === 1100) ? 409:400;
    next();
}

export const addUpdateSettings = function (next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
}