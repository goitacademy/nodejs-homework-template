const { HttpErrors } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(new HttpErrors(404, "Contact not found"));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
