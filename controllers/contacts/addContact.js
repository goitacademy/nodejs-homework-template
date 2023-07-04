const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const addContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(addContact);
};

module.exports = addContact;
