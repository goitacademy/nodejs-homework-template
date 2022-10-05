const { RequestError } = require("../helpers")

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    next()
  }
  return func;
}

module.exports = validateBody;