const {HttpError} = require("../helpers");




const validateBody = schema =>{
   const func = async(req, res, next)=>{
      const keys = Object.keys(req.body);
      if (keys.length === 0) {
        next(HttpError(400, "missing fields"));
    }
        const {error} = schema.validate(req.body)
        if(error){
            next( HttpError(400, error.message))
        }
      next()
    }
    return func;
}


module.exports = validateBody;