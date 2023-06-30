const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  console.log(newContact);
  res.status(201).json(newContact);
};

module.exports = addContact;
