const Joi = require("Joi");
const { ValidationError } = require("../helpers/errors");
// const CONTACT_FIELDS = ["name", "email", "phone"];
const pattern = "^[0-9]{7,13}$";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().pattern(new RegExp(pattern)).required(),
  favorite: Joi.bool().optional(),
});

const addContactValidation = (req, res, next) => {
  const { body } = req;
  // const bodyKeys = Object.keys(body);
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    next(new ValidationError("missing required name field"));
    // return res.status(400).json({ message: "missing required name field" });
  }
  const validationResult = schema.validate(body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
    // return res.status(400).json({ message: validationResult.error });
  }
  next();
};

const schemaPatch = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .optional(),
  phone: Joi.string().pattern(new RegExp(pattern)).optional(),
  favorite: Joi.bool().optional(),
});

const changeContactValidation = (req, res, next) => {
  const { body } = req;
  const { name, email, phone, favorite } = body;
  if (!name && !email && !phone && !favorite) {
    next(new ValidationError("missing fields"));
    // return res.status(400).json({ message: "missing fields" });
  }
  const validationResult = schemaPatch.validate(body);
  if (validationResult.error) {
    // return res.status(400).json({ message: validationResult.error });
    next(new ValidationError(validationResult.error));
  }
  next();
};
const schemaFavoritePatch = Joi.object({
  favorite: Joi.bool().required(),
});
const changeFavoritetValidation = (req, res, next) => {
  const { body } = req;
  const { favorite } = body;
  if (!favorite) {
    // return res.status(400).json({ message: "missing field favorite" });
    next(new ValidationError("missing field favorite"));
  }
  const validationResult = schemaFavoritePatch.validate(body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  //   return res.status(400).json({ message: validationResult.error });
  // }
  next();
};

module.exports = {
  addContactValidation,
  changeContactValidation,
  changeFavoritetValidation,
};
