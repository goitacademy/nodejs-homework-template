const Joi = require("joi");

// validation POST
const addPostValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .min(7)
      .max(15)
      .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      )
      .required(),
    favorite: Joi.boolean(),

  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      message: "entered incorrect data",
    });
  }
  next();
};

// validation PUT
const addPutValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .min(7)
      .max(15)
      .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      )
      .required(),
    favorite: Joi.boolean(),

  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      message: "entered PUT incorrect data",
    });
  }
  next();
};

// validation updateFavoriteStatus
const updateFavoriteStatusValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean(),
  });
  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      status: validationSchema.error.details,

    });
  }
  next();
};

module.exports = {
  addPostValidation,
  addPutValidation,

  updateFavoriteStatusValidation,

};
