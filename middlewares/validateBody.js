const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const result = schema.validate(req.body);
    const error = result.error;
    if (error) {
      const { details } = error;
      const errorPath = details.map((detail) => detail.path);
      const defaultErrorsMessage = details.map((detail) => detail.message);

      if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "missing fields");
      }

      const errorsMessage = details.map((detail) => {
        if (detail.type === "any.required") {
          return `missing required ${errorPath} field`;
        } else if (detail.type === "string.base") {
          return `field ${errorPath} must be a string`;
        }
        return defaultErrorsMessage;
      });

      next(HttpError(400, errorsMessage));
    }
    next();
  };
  return func;
};

module.exports = validateBody;

// const validateBody = (schema) => {
//   const func = (req, res, next) => {
//     const result = schema.validate(req.body);
//     const error = result.error;
//     if (error) {
//       if (Object.keys(req.body).length === 0) {
//         throw HttpError(400, "missing fields");
//       }

//       const { details } = error;
//       const errorPath = details.map((detail) => detail.path);
//       const errorType = details.map((detail) => detail.type);
//       const defaultErrorMessage = details.map((detail) => detail.message);

//       if (errorType.includes("any.required")) {
//         next(HttpError(400, `missing required ${errorPath} field`));
//       } else if (errorType.includes("string.base")) {
//         next(HttpError(400, `field ${errorPath} must be a string`));
//       }
//       return defaultErrorMessage;
//     }
//     next();
//   };
//   return func;
// };

// module.exports = validateBody;
