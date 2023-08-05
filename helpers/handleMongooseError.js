const handleMongooseError = (error, data, next) => {
    const {name, code} = error;
    const status = (name === "MongoServererror" && code === 11000) ? 409 : 400;
    error.status = status;
    next()
}

module.exports = handleMongooseError;