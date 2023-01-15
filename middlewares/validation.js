// const { HttpError } = require("../helpers/index");
const { ValidationError } = require("../helpers/index");

// function validateBody(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return next(HttpError(400, error.message));
//     }
//     return next();
//   };
// }

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.message);
    }
    return next();
  };
}

module.exports = { validateBody };
