const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {

    if (!Object.keys(req.body).length) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      // next(HttpError(400, error.message));
    
  next(HttpError(400, error.message));
      // next(HttpError(400, (error.message = "missing fields")));
      
    }
    next();
  };
  return func;
};

module.exports = validateBody;
