const { HttpError } = require("../utils/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return req.route.methods.patch ? next(HttpError(400, "missing field favorite")) : next(HttpError(400, "missing fields"))  
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `${error.details[0].message}`));
    }
    next();
  };
  return func;
};


module.exports = validateBody;
