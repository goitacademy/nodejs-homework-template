const Joi = require("joi");
const emailExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const postSchema = Joi.object({
  name: Joi.string().pattern(nameExp).min(3).max(15).required(),
  email: Joi.string().pattern(emailExp).required(),
  phone: Joi.string().pattern(phoneExp).required(),
});

const putSchema = Joi.object({
  name: Joi.string().pattern(nameExp).min(3).max(15).optional(),
  email: Joi.string().pattern(emailExp).optional(),
  phone: Joi.string().pattern(phoneExp).optional(),
});

module.exports = {
  postSchema,
  putSchema,
};

// module.exports = {
//   addPostsValidation: (req, res, next) => {
//     const schema = Joi.object({
//       name: Joi.string()
//         .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
//         .min(3)
//         .max(15)
//         .required(),
//       email: Joi.string()
//         .pattern(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         )
//         .required(),
//       phone: Joi.string()
//         .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
//         .required(),
//     });

//     const validationResult = schema.validate(req.body);
//     if (validationResult.error) {
//       return res.status(400).json({
//         message: validationResult.error,
//       });
//     }
//     next();
//   },
//   addPutValidation: (req, res, next) => {
//     const schema = Joi.object({
//       name: Joi.string()
//         .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
//         .min(3)
//         .max(15)
//         .optional(),
//       email: Joi.string()
//         .pattern(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         )
//         .optional(),
//       phone: Joi.string()
//         .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
//         .optional(),
//     });

//     const validationResult = schema.validate(req.body);
//     if (validationResult.error) {
//       return res.status(400).json({
//         message: validationResult.error,
//       });
//     }
//     next();
//   },
// };
