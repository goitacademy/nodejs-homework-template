const {isValidObjectId}= require('mongoose')

exports.isObjectId= (value,helpers)=>{
if(isValidObjectId(value)){
    return helpers.error("mongo.ObjectId")
}
return value;
}

