const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
//   const func = (req, res, next) => {
//     if (req.method === "PATCH") {
//       throw HttpError(400, "missing field favorite ");
//     }
//     if (!req.body || Object.keys(req.body).length === 0) {
//       throw HttpError(400, "missing fields ");
//     }

//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(HttpError(400, `${error.details[0].message}`));
//     }
//     next();
//   };
//   return func;
// };
const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (
      !req.body ||
      (Object.keys(req.body).length === 0 && req.method === "PUT")
    ) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
