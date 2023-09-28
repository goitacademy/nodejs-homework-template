const { HttpError } = require("../helpers");

const validateBody = (shema, message) => {
  const func = (req, _, next) => {
    const { error } = shema.validate(req.body);

    if (error) {
      next(HttpError(400, { message }));
    }
    next();
  };

  return func;
};

module.exports = { validateBody };
