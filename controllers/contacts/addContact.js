const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/utils`);

const addContact = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
