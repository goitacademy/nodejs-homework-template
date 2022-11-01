const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(10).max(14),
  });
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    res.status(400).json({ message: "missing required name field" });
  }
  next();
};

const changeContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(10).max(14),
  });
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    res.status(400).json({ message: "missing required name field" });
  }
  next();
};

module.exports = { addContactValidation, changeContactValidation };
