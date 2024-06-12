const { RequestError } = require("../services");

const validation = (schema) => {
  const checking = async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      next(RequestError(400, "missing fields"));

    const { error } = schema.validate(req.body);
    if (error) next(RequestError(400, error.message));
    next();
  };

  return checking;
};

module.exports = validation;
