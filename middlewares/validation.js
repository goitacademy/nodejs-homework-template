const { HttpError } = require("../helpers");
const validation = (schema, message) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validation;
