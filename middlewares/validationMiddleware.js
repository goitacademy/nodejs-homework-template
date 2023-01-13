const Joi = require("joi");

const addPostValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

module.exports = { addPostValidation };

// const addPostValidation = async (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().alphanum().min(3).max(30).required(),
//     email: Joi.string()
//       .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net"] },
//       })
//       .required(),
//     phone: Joi.string().alphanum().min(3).max(30).required(),
//   });

//   try {
//     const validationResult = await schema.validateAsync(req.body);
//     if (validationResult.error) {
//       return res.status(400).json({
//         message: validationResult.error.details,
//         code: 400,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   next();
// };
