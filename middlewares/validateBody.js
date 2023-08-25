const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const missingFieldMessage = req.path.split("/").includes("favorite") ? "missing field favorite" : "missing fields";

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, missingFieldMessage);
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    };

    next();
  };

  return func;
};

module.exports = validateBody;