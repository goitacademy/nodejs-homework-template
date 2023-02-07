const Contact = require("../../models/contact");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({ code: 201, result });
};

module.exports = addContact;
