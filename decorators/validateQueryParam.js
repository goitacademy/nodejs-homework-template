import { HttpError } from "../helpers/index.js";

const validateQueryParam = (schema) => {
  const func = (req, res, next) => {
    const query = req.query;
    const isValidate = schema.validate(query);
    if (isValidate.error) {
      const { type, path: notAllowedQueryArr } = isValidate.error.details[0];
      if (type === "object.unknown") {
        isValidate.error.message = `Query ${notAllowedQueryArr} is not allowed.`;
      }
      return next(HttpError(400, isValidate.error.message));
    }
    next();
  };
  return func;
};

export default validateQueryParam;
