const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]|[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .min(6)
    .max(12)
    .pattern(/^[0-9]+$/)
    .required(),
});

const createValidator = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.details[0].type === "any.required") {
      switch (error.details[0].context.key) {
        case "name":
          return res
            .status(400)
            .json({ message: "missing required name field" });
          break;
        case "email":
          return res
            .status(400)
            .json({ message: "missing required email field" });
          break;

        case "phone":
          return res
            .status(400)
            .json({ message: "missing required phone field" });
      }
    }
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = createValidator;
