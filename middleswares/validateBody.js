const { HttpError } = require("../helpers");

const validateBody = (schema) => {
 
  const func = (req, res, next) => {
     console.log("блинчик");
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("помикла");
      console.log(error.message);
      next(HttpError(400, error.message));
    }
    
    next();
  };

  return func;
};

module.exports = validateBody;
