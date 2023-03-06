const Contact = require("../../models/contacts");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
};


module.exports = createContact;