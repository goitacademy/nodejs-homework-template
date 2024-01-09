const { HttpError } = require("../helpers");

const validateContactBody = (schema) => {
  const func = (req, res, next) => {
    console.log(schema);
    const { error } = schema.validate(req.body);

    if (error) next(HttpError(400, error.message));
    next();
  };

  return func;
};

module.exports = { validateContactBody };