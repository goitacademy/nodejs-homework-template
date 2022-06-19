const Joi = require("joi");

module.exports = {
  fieldValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .min(7)
        .max(17)
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const [errorMessage] = error.details;
      return res.status(400).json({ message: `${errorMessage.message}` });
    }
    next();
  },
};
