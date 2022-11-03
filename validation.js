const Joi = require("joi");

const requestBodyValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/
      )
      .rule({
        message:
          "Name may contain letters, numbers, apostrophe, dash and spaces",
      })
      .min(3)
      .max(30)
      .required(),

    email: Joi.string().email({ minDomainSegments: 2 }).required(),

    phone: Joi.string()
      .min(5)
      .max(20)
      .pattern(
        /^[+]?[(]?[0-9]{0,3}[-\s. ]?[)]?[(]?[0-9]{0,3}[-\s. ]?[)]?[-\s. ]?[0-9]{0,3}[-\s. ]?[-\s. ]?[0-9]{0,3}[-\s. ]?[0-9]{2,9}$/
      )
      .rule({
        message:
          "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. Examples of valid phone number format: +XX(XXX)XXX-XX-XX, (XXX)XXX-XX-XX, XXX-XX-XX.",
      })
      .required(),
  });

  return schema.validate(body);
};

module.exports = { requestBodyValidation };
