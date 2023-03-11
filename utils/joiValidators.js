const Joi = require('joi');

/**
 * Validate create user data.
 */
exports.createContactValidator = (data) => Joi.object({
  name: Joi.string().min(2).max(10).required(),
//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//   phone: 
}).validate(data);
