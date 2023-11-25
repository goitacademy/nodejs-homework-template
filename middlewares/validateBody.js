const HttpError = require("../controllers/HttpError");

const validateBody = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "Missing fields");
  }
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateBody;
