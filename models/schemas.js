// models\schema.js
const joi = require('joi')

const emailSchema = joi
  .string()
  .required()
  .email()
  .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'email')
  .lowercase()
  .trim()
  .strict()
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
    'string.pattern.base': 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be 8 to 16 characters long.'
  })

const phoneSchema = joi
  .string()
  .pattern(/^\+(?:[0-9] ?){6,16}[0-9]$/, 'phone')
  .replace(/\s+/g, ' ')
  .trim()
  .message(
    'Invalid phone number. It should start with a "+" and can include spaces, and should be between 7 and 15 digits in total.'
)

const nameSchema = joi
  .string()
  .required()
  .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/, 'name')
  .min(3)
  .max(255)
  .replace(/\s+/g, ' ') // Eliminar dobles espacios y normalizar espacios en blanco
  .trim() // Eliminar espacios en blanco al principio y al final
  .message('Invalid name. It must contain at least one first and last name.')
  .strict()

// general validation
const registerUserSchema = joi.object().keys({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  subscription: joi.string().lowercase().replace(/\s+/g, ' ').trim(),
  phone: phoneSchema,
  favorite: joi.boolean(),
  active: joi.boolean()
})

const registerSchema = joi.object().keys({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  subscription: joi.string().lowercase().replace(/\s+/g, ' ').trim(),
  phone: phoneSchema,
  favorite: joi.boolean(),
  active: joi.boolean()
})

const loginSchema = joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
  active: joi.boolean()
})

const addContact = joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema
})

const updateContact = joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema
})
  .or('name', 'email', 'phone')
  .required()

const schemasValidations = {
  registerSchema,
  registerUserSchema,
  loginSchema,
  addContact,
updateContact}

module.exports = schemasValidations

//   addContact,
//   updateContact,

/**
 * @swagger
 * components:
 *  schemas:
 *      SchemaSignIn:
 *          type: object
 *          properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               subscription:
 *                 type: string
 *                 description: User's subscription type (e.g., starter, pro, business)
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               favorite:
 *                 type: boolean
 *                 description: Whether the user is marked as favorite
 *               active:
 *                 type: boolean
 *                 description: Whether the user is active
 */
