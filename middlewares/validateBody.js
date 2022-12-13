// const contactSchema = require("../schemas/contactSchema");
const { createError } = require("../helpers/createError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "missing required name field"));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
