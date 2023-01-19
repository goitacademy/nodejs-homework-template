const { Contacts } = require("../../model");

const addContact = async (req, res) => {
  const result = await Contacts.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
