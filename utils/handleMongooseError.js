const handleMongooseError = (error, data, next) => {
    errorHadle =
        error.status = 400;
    next();
};

module.exports = handleMongooseError;