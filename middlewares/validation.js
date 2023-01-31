const { RequestError } = require("../helpers");

const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(RequestError(400, error.massage));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
