const { HttpError } = require("../helper/HttpError");

const validateBody = (Schema) => {
  const func = (req, res, next) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      next(HttpError(404, message.error));
    }
  };
  return func;
};
module.exports = validateBody;
