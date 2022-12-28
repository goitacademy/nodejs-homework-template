const handleMongooseError = (error, data, next) => {
    console.log(error.code);
    console.log(error.name);
    const { name, code } = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    next()
}

module.exports = handleMongooseError;