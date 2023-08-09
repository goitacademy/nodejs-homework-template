const HttpErrors=require('./HttpError')
const handleMongooseError=(error, data, next)=>{
 const {name, code}=error;
 console.log(name, code)
 if(name==='MongoServerError' && code===11000){
    next(HttpErrors(409, 'The user with this email is already in the database'))
 }
 next()
}

module.exports=handleMongooseError