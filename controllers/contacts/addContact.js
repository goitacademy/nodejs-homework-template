const createError = require("http-errors");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().min(5).max(30).required(),
  phone: Joi.string().min(5).max(20).required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, {
        message: `Missing required field: ${error.message}`,
      });
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
