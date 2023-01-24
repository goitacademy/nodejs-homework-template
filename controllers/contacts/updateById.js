const Joi = require("joi");
const createError = require("http-errors");
const { updateContact } = require("../../models/contacts.js");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
