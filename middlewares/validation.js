const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      next(createError(400, "Missing fields"));
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }
    next();
  };
};

module.exports = validation;
