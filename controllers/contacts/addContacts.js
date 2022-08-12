const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  email: Joi.string().min(1).max(15).required(),
  phone: Joi.number().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = contactsOperations.addContact(req.body);

    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
