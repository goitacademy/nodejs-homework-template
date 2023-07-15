const { addContact } = require("../../models/contacts");

const addOneContact = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

module.exports = addOneContact;
