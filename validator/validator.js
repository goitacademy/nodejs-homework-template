const Joi = require("joi");

const validateData = (schema) => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      code: 400,
      message: "missing fields",
    });
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const [{ message }] = error.details;
    console.log(error);
    return res.status(400).json({
      status: "failure",
      code: 400,
      message: `${message.replace(/"/g, "")}`,
    });
  }
  next();
};

const contactValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
    .required(),

  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{3}$/)
    .message({
      "string.pattern.base": `Phone number must be written as 777-777-777.`,
    })
    .required(),
});

const userValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character.",
      "string.min": "Password must be at least {#limit} characters long.",
      "any.required": "Password is required.",
    }),
});

module.exports.contactValid = validateData(contactValidation);
module.exports.userValid = validateData(userValidation);
