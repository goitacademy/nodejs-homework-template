const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const fieldsQuantity = Object.keys(req.body).length;
    if (!fieldsQuantity) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
