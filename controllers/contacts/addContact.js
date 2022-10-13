const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = addContact;
