const Joi = require("joi");

const postValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().max(30).required(),
    phone: Joi.number().integer().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);
  console.log(validationResult);
  if (validationResult.error) {
    console.log("postValidate");
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const patchPutValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().max(30),
    phone: Joi.number().integer(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const validationResult = schema.validate(req.body);
  console.log(validationResult);
  if (validationResult.error) {
    console.log("postValidate");
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

module.exports = { postValidate, patchPutValidate };
