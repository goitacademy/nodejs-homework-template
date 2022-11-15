// const {ValidationError} = require("../helpers/errors");
const validatorBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    console.log("ValidBodyresult:", result.error);
    if (result.error) {
      result.error = 400;
      next(result.error);
    }
    next();
  };
};
module.exports = {validatorBody};
