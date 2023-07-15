import Joi from "joi";

export const nameSchema = Joi.string()
  .pattern(
    new RegExp(
      "^\\s*[A-ZА-Я\\u0406ЇЄa-zа-яіїє]{2,}(\\s+[A-ZА-Я\\u0406ЇЄa-zа-яіїє]{2,})?\\s*$"
    )
  )
  .required();
export const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  .required();

export const phoneSchema = Joi.string()
  .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
  .required();
