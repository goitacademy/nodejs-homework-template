const { HttpError } = require("../helpers");
const { PostBodyError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!Object.keys(req.body).length) {
        next(HttpError(400, "missing fields"));
      } else if (Object.keys(req.body).length > 0) {
        next(
          HttpError(
            400,
            `missing required '${PostBodyError(error.message)}' field`
          )
        );
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
