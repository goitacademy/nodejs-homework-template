const { HttpError } = require("../helpers/index.js");
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    // console.log(123);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
