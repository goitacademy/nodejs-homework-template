const Joi = require("joi");

module.exports = {
  addContactValidation: async (req, res, next) => {
    const addSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = addSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    next();
  },
  patchContactValidation: (req, res, next) => {
    const addSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationResult = addSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  updateFavoriteSchema: (req, res, next) => {
    const addSchema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = addSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  },
};
