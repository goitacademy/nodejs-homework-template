const contactsOperations = require("../../models/contacts.js");

const add = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);
  res
    .status(201)
    .json({ message: "contact successfully added", result: newContact });
};

module.exports = add;
