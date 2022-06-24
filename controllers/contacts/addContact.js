const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  const result = await Contact.create({ favorite: false, ...req.body });
  res.status(201).json(result);
};
module.exports = addContact;
