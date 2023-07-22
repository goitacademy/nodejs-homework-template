const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const result = schema.validate(req.body);
    const error = result.error;
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;

// const { HttpError } = require("../utils");

// const validateBody = (schema) => {
//   const func = (req, res, next) => {
//     const result = schema.validate(req.body);
//     const error = result.error;
//     if (error) {
//       const { details } = error;
//       const errorPath = details.map((detail) => detail.path);
//       const defaultErrorsMessage = details.map((detail) => detail.message);

//       if (Object.keys(req.body).length === 0) {
//         throw HttpError(400, "missing fields");
//       }

//       const errorsMessage = details.map((detail) => {
//         if (detail.type === "any.required") {
//           return `missing required ${errorPath} field`;
//         } else if (detail.type === "string.base") {
//           return `field ${errorPath} must be a string`;
//         }
//         return defaultErrorsMessage;
//       });

//       next(HttpError(400, errorsMessage));
//     }
//     next();
//   };
//   return func;
// };

// module.exports = validateBody;
