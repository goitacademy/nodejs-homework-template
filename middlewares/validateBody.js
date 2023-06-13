const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing required ${error.message.slice(1, error.message.lastIndexOf('"'))} field`
        )
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
// const { error } = addSchema.validate(req.body);
// if (error) {
//   throw HttpError(
//     400,
//     `missing required ${error.message.slice(1, error.message.lastIndexOf('"'))} field`
//   );
// }
