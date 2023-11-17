const handleMongooseError = (error, data, next)=>{
    console.log('ddddddddddddd', error)
    console.log('fffffffffffff', data)
    console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    error.status = 400
    next()
}
module.exports = handleMongooseError