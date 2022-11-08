const Joi = require("joi");

const schemaValidateContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(7).max(15),
  subscription: Joi.string(),
});

const validate = (schema, obj, next) => {
  const {error} = schema.validate(obj);
  if (error) {
    return next({
      status: 400,
      message: "Bad request",
    });
  }
  next();
};

module.exports.validateContact = (req, _res, next) => {
  return validate(schemaValidateContact, req.body, next);
};

// const Joi = require("joi");

// const schemaCreate = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string()
//     .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
//     .required(),
// });

// const schemaUpdate = Joi.object({
//   name: Joi.string().min(3).max(30).optional(),
//   email: Joi.string().email().optional(),
//   phone: Joi.string()
//     .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
//     .optional(),
// });

// const validate = (schema, obj, next) => {
//   const {error} = schema.validate(obj);
//   if (error) {
//     return next({
//       status: 400,
//       message: "Bad request",
//     });
//   }
//   next();
// };

// module.exports.createContact = (req, res, next) => {
//   return validate(schemaCreate, req.body, next);
// };

// module.exports.updateContact = (req, res, next) => {
//   return validate(schemaUpdate, req.body, next);
// };
