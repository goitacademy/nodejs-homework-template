const { ErrorHandling } = require("../helper/errorReq");
const validateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ErrorHandling(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = { validateContact };
