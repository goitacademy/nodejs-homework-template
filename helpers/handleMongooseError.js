//alternative fast hand way to validate error
//for validation better to use joi and this method combined
const handleMongooseError = (error, data, next) => {
    const { name, code } = error;
    // console.log(error)
    // console.log(name,code)
    error.status = (code === 11000 && name === 'MongoServerError') ? 409 : 400;
    // error.staus = 400;
    next();
}

module.exports = handleMongooseError;