const { RequestError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!Object.keys(req.body).length) {
      next(RequestError(400, "missing  fields"));
    } else if (error) {
      next(
        RequestError(
          400,
          `missing required ${error.message.slice(
            1,
            error.message.lastIndexOf('"')
          )} field`
        )
      );
    }
    next(error);
  };
  return func;
};
module.exports = validateBody;
