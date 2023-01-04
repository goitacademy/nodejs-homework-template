const Joi = require("joi");
module.exports = {
  addContactValidation: (req, res, next) => {
    const scema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string().min(7).max(20).required(),
      favorite: Joi.bool(),
    });
    const validateContact = scema.validate(req.body);
    if (validateContact.error) {
      return res
        .status(400)
        .json({ message: validateContact.error, code: 400 });
    }
    next();
  },
  putContactVlidation: (req, res, next) => {
    const scema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string(),

      phone: Joi.string().min(7).max(20),
      favorite: Joi.bool(),
    });
    const validateContact = scema.validate(req.body);
    if (validateContact.error) {
      return res
        .status(400)
        .json({ message: validateContact.error, code: 400 });
    }
    next();
  },
  patchContactVlidation: (req, res, next) => {
    const scema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(7).max(20),
      favorite: Joi.bool().required(),
    });
    const validateContact = scema.validate(req.body);
    if (validateContact.error) {
      return res
        .status(400)
        .json({ message: validateContact.error, code: 400 });
    }
    next();
  },
};
