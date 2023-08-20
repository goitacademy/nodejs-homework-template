import Joi from "@hapi/joi";
import { HttpError } from "./index.js";

const requiredFieldsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

const validateData = (request, response, next) => {
  const { error } = requiredFieldsSchema.validate(request.body);
  if (error) {
    const fieldName = error.details[0].path[0];
    throw HttpError(400, `missing required ${fieldName} field`);
  }
  next();
};

export default validateData;
