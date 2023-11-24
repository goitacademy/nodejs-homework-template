const { BadRequest } = require("http-errors");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length < 1) {
      throw new BadRequest("missing fields");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
