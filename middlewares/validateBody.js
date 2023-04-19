const { RequestError } = require("../helpers");

const validateBody = (sxhema) => {
  const func = (req, res, next) => {
    const { error } = sxhema.validate(req.body);
    if (error) {
      next(RequestError(400, error.massage));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
