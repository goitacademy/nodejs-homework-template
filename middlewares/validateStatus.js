const { RequestError } = require("../services");

const validateStatus = (schema) => {
  const checking = async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      next(RequestError(400, "missing field favorite"));

    const { error } = schema.validate(req.body);
    if (error) next(RequestError(400, error.message));
    next();
  };

  return checking;
};

module.exports = validateStatus;
