const { requestError } = require("../helpers");
const validationBody = (schema) => {
  const funcWrapper = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
  return funcWrapper;
};
module.exports = validationBody;
