// const Joi = require("joi");

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean().default(false),
// });
// const validate = (schema, obj, next) => {
//   const { error } = schema.validate(obj);
//   if (error) {
//     return next({
//       status: 400,
//       message: "Bad request",
//     });
//   }
//   next();
// };

// module.exports.validateContact = (req, _res, next) => {
//   return validate(joiSchema, req.body, next);
// };

// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       res.status(400).json({
//         status: "error",
//         code: 404,
//         message: error.message,
//       });
//       return;
//     }
//     next();
//   };
// };
// module.exports = {
//   validation,
// };
