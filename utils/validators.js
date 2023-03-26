const Joi = require("joi");
const JoiPhoneNumber = Joi.extend(require("joi-phone-number"));

exports.contactValidator = (data) => {
  const result = Joi.object({
    name: Joi.string().min(2).max(12).required(),
    email: Joi.string().email().required(),
    phone: JoiPhoneNumber.string().phoneNumber().required(),
  });

  return result.validate(data);
};
