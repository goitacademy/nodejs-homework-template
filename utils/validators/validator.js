import joi from "joi";

const contactSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.string().min(5),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

export const contactValidator = validator(contactSchema);
