// const Joi = require("joi");

// const schemaValidation = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.alternatives()
//     .try(
//       Joi.string().pattern(/^\d{10}$/),
//       Joi.string().pattern(/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
//       Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{2}-\d{2}$/),
//       Joi.string().pattern(/^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/),
//       Joi.string().pattern(/^\d{3} \d{3}-\d{2}-\d{2}$/),
//       Joi.string().pattern(/^\d{3}-\d{3}-\d{2}-\d{2}$/),
//       Joi.string().pattern(/^\(\d{3}\)\d{3}-\d{4}$/),
//       Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
//       Joi.string().pattern(/^\(\d{3}\)-\d{3}-\d{4}$/),
//       Joi.string().pattern(/^\(\d{3}\)\d{7}$/),
//       Joi.string().pattern(/^\(\d{3}\) \d{7}$/),
//       Joi.string().pattern(/^\(\d{3}\)-\d{7}$/),
//       Joi.string().pattern(/^\d{3} \d{7}$/),
//       Joi.string().pattern(/^\d{3}-\d{7}$/)
//     )
//     .required(),
// });

// module.exports = {
//   schemaValidation,
// };
