const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      next(createError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw createError(400, "missing required name field");
    }
    next();
  };
};

module.exports = validation;
