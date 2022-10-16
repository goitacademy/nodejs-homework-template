const { RequestError } = require("../helpers");

const validateAddBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    next();
  };

  return func;
};

module.exports = validateAddBody;
