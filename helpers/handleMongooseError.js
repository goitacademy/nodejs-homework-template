const HttpErrors=require('./HttpError')
const handleMongooseError=(error, data, next)=>{
 const {name, code}=error;
const status=(name==='MongoServerError' && code===11000)? 409: 400
       next(HttpErrors(status))
}

module.exports=handleMongooseError