const handleMongooseError = (error, data, next) => {
    const status = (name === "MongoServerError" && code === 11000 ? 409 : 400)
    error.status = status;
    next()
} ;

module.exports = handleMongooseError;
