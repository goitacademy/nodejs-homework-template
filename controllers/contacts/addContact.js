const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: "succsess", code: 201, data: newContact });
};

module.exports = addContact;