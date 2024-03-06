// Walidacja danych wejściowych
import Joi from "joi";

const requiredSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const optionalSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

export { requiredSchema, optionalSchema };
