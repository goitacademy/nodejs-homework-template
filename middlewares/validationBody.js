const { BadRequest } = require("http-errors");

const validationBody = (schema) => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(BadRequest("missing required name field"));
    }
    next();
  };

  return func;
};

module.exports = validationBody;