const { BadRequest } = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest("missing fields");
    }
    if (error) {
      const [er] = error.details[0].path;
      throw new BadRequest(`missing required ${er} field`);
    }

    next();
  };
};

module.exports = validation;

// const Joi = require("joi");

// module.exports = {
//   addContactValidation: (req, res, next) => {
//     const schema = Joi.object({
//       name: Joi.string().alphanum().min(3).max(10).required(),
//       email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//         .required(),
//       phone: Joi.number().required(),
//     });

//     const validationResult = schema.validate(req.body);

//     if (validationResult.error) {
//       return res.status(400).json({
//         status: validationResult.error.details,
//         message: `missing required field`,
//       });
//     }
