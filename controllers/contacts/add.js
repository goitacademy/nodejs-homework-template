const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

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

const add = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactsChema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const addContact = await contactsOperations.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: addContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
