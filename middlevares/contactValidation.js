const Joi = require("joi");

const { contactSchema, contactsFavSchema } = require("../schema");

const addValidation = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }

  next();
};

const addFavValidation = (req, res, next) => {
  const { error } = contactsFavSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }

  next();
};

module.exports = { addValidation, addFavValidation };
