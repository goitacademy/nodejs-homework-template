//alternative fast hand way to validate error
//for validation better to use joi and this method combined
const handleMongooseError = (error, data, next) => {
    error.staus = 400;
    next();
}

module.exports = handleMongooseError;