const { Contact } = require('../../models/contact-schema');

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: 'missing required name field' });
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

module.exports = createContact;
