const { RequestError } = require("../helpers");

const validateUpdateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    next();
  };

  return func;
};

module.exports = validateUpdateBody;
