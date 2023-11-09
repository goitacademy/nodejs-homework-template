import Joi from "joi";
import { VALIDATION_DATA } from "../../constants/index.js";
import { setJoiShapeTrimAll } from "../../helpers/index.js";

const { name, phone, email } = VALIDATION_DATA;

const shape = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ "string.pattern.base": name.message })
    .required(),

  phone: Joi.string()
    .pattern(phone.pattern)
    .messages({ "string.pattern.base": phone.message })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ "string.email": email.message })
    .required(),

  favorite: Joi.boolean().default(false),
};

setJoiShapeTrimAll(shape);

export const schema = {
  add: Joi.object(shape),
  updateStatus: Joi.object({
    favorite: Joi.boolean().required(),
  }),
};
