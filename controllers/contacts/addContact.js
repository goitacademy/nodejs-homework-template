const contactOperation = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const result = await contactOperation.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
