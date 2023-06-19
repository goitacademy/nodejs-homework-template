const { HTTPError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HTTPError(
        400,
        `missing required ${JSON.parse(error.message.split(" ")[0])} field`
      );
    }
    next();
  };
  return func;
};
module.exports = validateBody;
