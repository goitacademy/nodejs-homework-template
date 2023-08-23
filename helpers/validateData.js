import Joi from "@hapi/joi";
import { HttpError } from "./index.js";

const requiredFieldsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

const validateData = (req, res, next) => {
  const { error } = requiredFieldsSchema.validate(req.body);
  if (error) {
    const fieldName = error.details[0].path[0];
    throw HttpError(400, fieldName );
  }
  next();
};

export default validateData;
