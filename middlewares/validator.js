
const validate = (addSchema) => {
    return (req, res, next) => {
      const { error } = addSchema.validate(req.body);
      
    
      if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        console.log("error 400! missing fields")
        throw res.status(400).json({ message: "missing fields" });
      }

      if (error) {
          error.status = 400;
          error.message = `Missing required ${error.details[0].context.label} field`;
          console.log(`error 400!`,error.message)
        next(error);
      }

      // if (error) {
      //   throw res.status(400).json({ message: `missing required ${error.details[0].context.label} field` });
      //        } 

       else {
        next();
      }
    };
  };



  module.exports = validate;
  