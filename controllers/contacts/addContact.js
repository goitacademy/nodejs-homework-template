const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
