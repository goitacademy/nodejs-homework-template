const { HttpError } = require("../helpers/HttpError");

const validateContactsBody = (schema) => {
  const func = (req, res, next) => {
    const validBody = req.body;
    if (Object.keys(validBody).length === 0) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = {
  validateContactsBody,
};
