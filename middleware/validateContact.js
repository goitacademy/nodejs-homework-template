const { ErrorHandling } = require("../helper/errorReq");
const validateContact = (schema) => {
  const func = (req, res, next) => {
    console.log(schema);
    if (Object.keys(req.body).length === 0) {
      next(ErrorHandling(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) next(ErrorHandling(400, error.message));
    next();
  };
  return func;
};

module.exports = { validateContact };
