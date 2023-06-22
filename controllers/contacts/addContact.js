const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);
  res.status(201).json(result);
};

module.exports = addContact;
