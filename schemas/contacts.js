const Joi = require("joi");
const { RequestError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required()
    .error(RequestError(400, "missing required name field")),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(
      RequestError(400, "missing required email field or domain not allowed")
    ),

  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .trim()
    .min(3)
    .max(12)
    .required()
    .error(
      RequestError(
        400,
        "phone length must contain only digits and must have more than 3 and less 12 symbols"
      )
    ),
})
  .min(3)
  .required();

const putAndPatchSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .optional()
    .error(
      RequestError(
        400,
        "Name can't be empty and must contain more than 3 symbols"
      )
    ),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .optional()
    .error(
      RequestError(
        400,
        "Email can't be empty and must contain domain more than 2 symbols "
      )
    ),

  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .trim()
    .min(3)
    .max(12)
    .optional()
    .error(
      RequestError(
        400,
        "Phone can't be empty and must contain more than 3 and less than 13 symbols"
      )
    ),
}).required();

module.exports = {
  addSchema,
  putAndPatchSchema,
};
