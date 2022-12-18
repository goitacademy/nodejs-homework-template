const Joi = require("joi");
const { NotFound } = require("http-errors");

const Contact = require("../../models/contact");

const updateContactSchema = Joi.object({
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
}).min(1);

const updateById = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
