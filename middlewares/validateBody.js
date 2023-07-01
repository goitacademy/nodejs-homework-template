const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, __, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400));
    }
    next();
  };
};
module.exports = validateBody;
