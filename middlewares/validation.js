const Joi = require("joi");

module.exports = {
  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: error.details });
    }
    next();
  },
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(20).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: error.details });
    }
    next();
  },
  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(10).max(400).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: error.details });
    }
    next();
  },
};
