const { nanoid } = require("nanoid");
const { postContact } = require("../models/contacts");

const addContact = async (req, res, __) => {
  const { name, email, phone } = req.body;
  const newContact = { id: nanoid(), name, email, phone };
  res.status(201).json(await postContact(newContact));
};

module.exports = addContact;
