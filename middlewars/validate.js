const { HttpError } = require("../helpers");

const validateBy = (schima) => {
  const func = (req, res, next) => {
    const { error } = schima.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    next();
  };
  return func;
};
module.exports = validateBy;
