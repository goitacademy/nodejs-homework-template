const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, net) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().required(),
    });
    const valid = schema.validate(req.body);

    if (valid.error) {
      res.status(400).json({
        status: valid.error,
      });
    }
    net();
  },
};
