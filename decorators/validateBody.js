import HtttpError from "../helpers/HttpError.js";

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const isValidate = schema.validate(req.body);
    if (isValidate.error) {
      return next(HtttpError(400, isValidate.error.message));
    }
    next();
  };
  return func;
};
export default validateBody;
