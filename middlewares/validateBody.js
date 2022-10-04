const { ReqErr } = require("../helpers/ReqErr");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ReqErr(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
