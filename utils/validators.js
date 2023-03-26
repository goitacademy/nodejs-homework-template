const Joi = require("joi");
const JoiPhoneNumber = Joi.extend(require("joi-phone-number"));

exports.contactValidator = (data) => {
  console.log("=========VALIDATOR=======");
  console.log(data);
  const result = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email(),
    phone: JoiPhoneNumber.string().phoneNumber(),
    favorite: Joi.boolean(),
  });

  console.log("========VALID=DATA========");
  console.log(result.validate(data));

  return result.validate(data);
};
