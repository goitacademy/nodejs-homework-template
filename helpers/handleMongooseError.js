const handleMongooseError = (error, data, next) => {
    const {code, name} = error;
    error.status = (code === 11000 && name === "MongoServerError" ) ? 409 : 400;
    // error.status = status;
    next()
    // console.log(name);
    // console.log(code);
};

module.exports = {handleMongooseError};