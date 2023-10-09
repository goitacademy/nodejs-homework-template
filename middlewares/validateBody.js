const { HttpError, changeOutputMessage } = require("../helpers");


const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, changeOutputMessage(error.message)));
    }
    next();
  };
  return func;
};

module.exports = validateBody;