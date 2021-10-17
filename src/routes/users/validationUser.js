// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

// const schemaUserSignup = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
//   subscription: Joi.string().optional(),
// });

// const schemaUserLogin = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
// });

// const schemaUpdatePassword = Joi.object({
//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional(),
// });

// const schemaUserId = Joi.object({
//   contactId: Joi.objectId().required(),
// });

// const validate = async (schema, obj, res, next) => {
//   try {
//     await schema.validateAsync(obj);
//     next();
//   } catch (err) {
//     res.status(400).json({
//       status: "error",
//       code: 400,
//       message: `Field ${err.message.replace(/"/g, "")}`,
//     });
//   }
// };

// module.exports.validateUserSignup = async (req, res, next) => {
//   return await validate(schemaUserSignup, req.body, res, next);
// };

// module.exports.validateUserLogin = async (req, res, next) => {
//   return await validate(schemaUserLogin, req.body, res, next);
// };

// // module.exports.validateSubscriptionUser = async (req, res, next) => {
// //   return await validate(schemaSubscriptionUser, req.body, res, next);
// // };

// module.exports.validateId = async (req, res, next) => {
//   return await validate(schemaUserId, req.params, res, next);
// };
