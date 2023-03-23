const {isValidObjectId}= require('mongoose')

exports.isObjectId= (value,helpers)=>{
if(isValidObjectId(value)){
    return helpers.error("mongo.ObjectId")
}
return value;
}

// exports.isObjectId = (req, _, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     const error = new Error(`${contactId} is not correct`);
//     error.status = 400;
//     next(error);
//   }
//   next();
// };

