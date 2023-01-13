const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const addContactSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(4).max(30).email().required(),
      phone: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
      favorite: Joi.boolean(),
    });

    const { error } = addContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error?.details[0].message });
    }
    next();
  },
  updateContactValidation: (req, res, next) => {
    const updateContactSchema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().min(4).max(30).email(),
      phone: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
      favorite: Joi.boolean(),
    });

    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error?.details[0].message });
    }

    next();
  },

  updateStatusValidation: (req, res, next) => {
    const updateStatusSchema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const { error } = updateStatusSchema.validate(req.body);
    if (error?.message) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    next();
  },
};
