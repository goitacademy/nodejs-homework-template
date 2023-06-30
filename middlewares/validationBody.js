const { requestError } = require("../utils");

const validationBody = (schema) => {
  const func = (req, _, next) => {
    const { body } = req;
    const { error } = schema.validate(body);
    const filledBody = Object.keys(body).length;

    if (!filledBody) {
      next(requestError(400, "missing  fields"));
    } else if (error) {
      next(
        requestError(
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

module.exports = validationBody;
