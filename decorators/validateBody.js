const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
    }

    if (error) {
      next(HttpError(400, error.message));
    }
    next(error);
  };
  return func;
};

module.exports = {
  validateBody,
};
