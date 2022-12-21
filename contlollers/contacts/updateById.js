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

const updateById = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contactOperations.updateContact(contactId, body);
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
