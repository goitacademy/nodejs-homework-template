const { HttpError } = require("../helpers");

const validateBody = (schems) => {
  const func = (req, res, next) => {
    if(JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "missing fields")
    }
    const { error } = schems.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
