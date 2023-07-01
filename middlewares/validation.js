const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      next(createError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);

    if (error) {
      const err = error.details[0].path[0];

      throw createError(400, `missing required ${err} field `);
    }
    next();
  };
};

module.exports = { validation };
