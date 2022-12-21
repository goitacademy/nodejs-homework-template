const Joi = require("joi");

const contactOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).trim().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

// const { contactSchema } = require("../../schemas");

const add = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contactOperations.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
