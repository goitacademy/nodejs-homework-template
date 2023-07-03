const Contact = require("../models/contact");

const { ctrlWrapper } = require("../helpers");

const addContact = ctrlWrapper(async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

module.exports = addContact;
