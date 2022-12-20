const { addContact } = require("../../models/contacts");
const postContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ newContact });
};

module.exports = postContact;
