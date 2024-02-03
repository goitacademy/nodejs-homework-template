const handleMongooseError = (err, data, next)=>{
    err.status = 400;
    console.log(err)
    next()
}

module.exports = handleMongooseError;
