const { HttpError } = require("../helpers");

const validateBy = (schima) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schima.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return func;
};
module.exports = validateBy;
