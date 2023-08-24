const hndleMongooseErr = (err,_,next) => {
    err.status = 400;
    next()
}
module.exports = handleMongooseErr;