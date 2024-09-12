const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing fields ${error.message}`);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
