// models\schema.js
const joi = require("joi");

const emailSchema = joi
  .string()
  .required()
  .email()
  .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "email")
  .lowercase()
  .trim();
//     email: joi.string().email({
//   minDomainSegments: 2,
//   tlds: { allow: ['com', 'net', 'org', 'io', 'es'] } // Puedes ajustar las extensiones permitidas según tus necesidades
// }).lowercase().trim().required()

const passwordSchema = joi
  .string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.,!%*?&])[A-Za-z\d@$.,!%*?&]{8,16}$/
  )
  .messages({
    "string.pattern.base":
      "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be 8 to 16 characters long.",
  });

const phoneSchema = joi
  .string()
  .pattern(/^\+(?:[0-9] ?){6,16}[0-9]$/, "phone")
  .replace(/\s+/g, " ")
  .trim()
  .message(
    'Invalid phone number. It should start with a "+" and can include spaces, and should be between 7 and 15 digits in total.'
  );

const nameSchema = joi
  .string()
  .required()
  .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/, "name")
  .min(3)
  .max(255)
  .replace(/\s+/g, " ") // Eliminar dobles espacios y normalizar espacios en blanco
  .trim() // Eliminar espacios en blanco al principio y al final
  .message("Invalid name. It must contain at least one first and last name.");

// general validation
const registerSchema = joi.object().keys({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  subscription: joi.string().lowercase().replace(/\s+/g, " ").trim(),
  phone: phoneSchema,
  favorite: joi.boolean(),
  active: joi.boolean(),
});

const loginSchema = joi.object().keys({
  email: emailSchema,
  password: joi.string().required(),
  active: joi.boolean(),
});

// const addContact = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// const updateContact = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
// })
//   .or("name", "email", "phone")
//   .required();
const schemasValidations = {
  registerSchema,
  loginSchema,
};

module.exports = schemasValidations;

//   addContact,
//   updateContact,
