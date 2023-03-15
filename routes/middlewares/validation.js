const Joi = require("joi");

module.exports = {
  addValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().min(13).max(13).required(),
      favorite: Joi.boolean(),
    });

    const valRes = schema.validate(req.body);
    if (valRes.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },

  updateValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(13).max(13),
      favorite: Joi.boolean(),
    });

    if (Object.keys(req.body).length < 1) {
      return res.status(400).json({ message: "missing fields" });
    }
    const valRes = schema.validate(req.body);
    if (valRes.error) {
      return res.status(400).json({ message: "Incorrect fields" });
    }
    next();
  },
};
