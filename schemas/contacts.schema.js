import Joi from "joi";

const messagesRequiredErrors = {
  "string.empty": "missing required {#label} field",
  "any.required": "missing required {#label} field",
};

const messagesNameErrors = {
  "string.pattern.base": "Field {#label} contains invalid characters",
};

const messagesPhoneErrors = {
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX",
};

export const contactSchemeRequired = Joi.object({
  name: Joi.string().required().messages(messagesRequiredErrors),
  email: Joi.string().required().messages(messagesRequiredErrors),
  phone: Joi.string().required().messages(messagesRequiredErrors),
});

export const contactSchemeValues = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(
      new RegExp(
        /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/
      )
    )
    .messages(messagesNameErrors),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(new RegExp(/^\(\d{3}\) \d{3}-\d{4}$/))
    .messages(messagesPhoneErrors),
});
