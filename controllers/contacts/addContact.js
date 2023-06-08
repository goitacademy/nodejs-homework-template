const { Contact, contactAddSchema } = require('../../models');

const { HttpError } = require('../../help');

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required name field ${error.message}`);
  }
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

module.exports = addContact;
