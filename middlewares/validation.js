const validation = (schema) => {
    validFunc = (req, res, next) => {
        console.log(schema.validate(req.body));
       const {error} = schema.validate(req.body);
       if(error){
           return res.status(400).json({
               message: error.message
           });
       }
       next();
   }

   return validFunc;
};

module.exports = validation;