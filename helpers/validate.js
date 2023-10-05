import HttpError from "./HttpError.js";

export const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      throw HttpError(400, error, message);
    }
  };
};
