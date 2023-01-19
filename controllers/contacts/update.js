const contactsOperations = require("../../models/contacts");
const Joi = require("joi");
const createError = require("http-errors");

const contactsChema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
});

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const { error } = contactsChema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const updatedContact = await contactsOperations.updateContact(id, body);
    if (!updatedContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
