const { addContact } = require("../models");

const contactAdd = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

module.exports = contactAdd;
