const { HttpError } = require("../helpers");
const { status } = require("../consts");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    next(HttpError({ ...status.MISSING_DATA, message: error.message }));
  }

  next();
};

module.exports = validateBody;
