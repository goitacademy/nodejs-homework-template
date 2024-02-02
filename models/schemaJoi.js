import Joi from "joi";
// Definicja schematu walidacji dla kontaktu
export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// Funkcja do walidacji danych kontaktu
export const validateContact = (data) => {
  return contactSchema.validate(data);
};
