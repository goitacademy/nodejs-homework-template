const { HttpErrors } = require("../helpers");

const validateSchema = schema => {
   const func = async (req, res, next) =>{
try {
    const {error} =schema.validate(req.body);
    if(error){
        console.log(error);
        let errorName =""
         error.details.map(item => errorName = item.message)
        throw HttpErrors (400, errorName)
    }
} catch (error) {
    next(error)
}
next()
   }

   return func
}

module.exports = validateSchema;