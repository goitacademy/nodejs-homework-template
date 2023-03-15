const { HttpError } = require("../utils");

const validateBody = (addSchema) => {
  const func = (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
