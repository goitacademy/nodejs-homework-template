const handleMongooseError = (error, data, next) => {
    const { name, code} = error;
    console.log(name);
    console.log(code);
    
    error.status = 400;
    next();
}

module.exports = handleMongooseError;