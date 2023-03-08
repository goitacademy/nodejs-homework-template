const Joi = require("joi");

const validationAddContact = (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate({ name, email, phone });

  if (error) {
    res
      .status("400")
      .json({
        message: `missing required ${error.details[0].context.key} field`,
      });
    return;
  }

  next();
};

const validationUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status("400").json({ message: "missing fields" });
    return;
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    phone: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const [{ message }] = error.details;
    res.status("400").json({ message: message });
    return;
  }

  next();
};

module.exports = { validationAddContact, validationUpdContact };
