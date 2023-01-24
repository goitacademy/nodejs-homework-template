const { addContact } = require("../../models/contacts");

const addNewContact = async (req, res, next) => {
  const data = await addContact(req);
  res.status(201).json({ data, status: 201, message: "operation successful" });
};

module.exports = addNewContact;
