const { HttpError } = require("../helpers");

const validateData = (shema) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      next(HttpError(400, "missing fields"));
    }

    const { error } = shema.validate(req.body);
    if (error) {
      const missingField = error.details[0].path[0];
      next(HttpError(400, `missing required field ${missingField}`));
    }
    next();
  };
  return func;
};

module.exports = validateData;
