const Joi = require("joi");

const Contact = require("../../models/contact");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().alphanum(),
  email: Joi.string()
    .min(4)
    .max(255)
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  phone: Joi.string()
    .min(4)
    .max(20)
    .pattern(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .message("Phone number must be min 6 numbers length")
    .required(),
  favorite: Joi.boolean(),
});

const add = async (req, res, next) => {
  try {
    const { error } = newContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
