const Joi = require("joi");

const fieldsValidations = {
  addContactValidation: (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!(name && email && phone)) {
      res
        .status(400)
        .json({ message: "fields 'name', 'email' and 'phone' are required " });
      return;
    }

    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^([a-zA-Z]{2,}\s?[a-zA-Z]{1,})/)
        .min(3)
        .max(30)
        .trim()
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .trim()
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .trim()
        .required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message:
          "fields that you try to change do not meet the validation requirements",
      });
    }

    next();
  },

  updateContactValidation: (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!(name ?? email ?? phone)) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^([a-zA-Z]{2,}\s?[a-zA-Z]{1,})/)
        .min(3)
        .max(30)
        .trim(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .trim(),
      phone: Joi.string().trim(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message:
          "fields that you try to change do not meet the validation requirements",
      });
    }
    next();
  },
};

module.exports = fieldsValidations;
