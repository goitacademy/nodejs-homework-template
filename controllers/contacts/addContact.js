const contacts = require('../../models/contacts.js');
const {HttpErr} = require('../../helpers');
const schemas = require('../../schemas/contact')

const addContact = async (req, res, next) => {
  const { error } = schemas.contactSchema.validate(req.body);

  if (error) {
    throw HttpErr(400, "Missing required name field");
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
}

module.exports = addContact;