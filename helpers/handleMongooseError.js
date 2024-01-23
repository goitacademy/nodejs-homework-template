const handleMongooseError = (error, data, next) => {
    error.message = 400;
    next();
};

module.exports = handleMongooseError;
