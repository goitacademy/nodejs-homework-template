const Joi = require("joi");

const { HttpError } = require("../helpers");

module.exports = {
  addContactValidation: async (req, res, next) => {
    const addSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const { error } = addSchema.validate(req.body);
    if (error) {
      console.log(error);
    }

    next();
  },
  patchContactValidation: (req, res, next) => {
    const addSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  },
};
