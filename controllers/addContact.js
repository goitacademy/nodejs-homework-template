const { postContact } = require("../services/contactsServices");

const addContact = async (req, res, __) => {
  res.status(201).json(await postContact(req.body));
};

module.exports = addContact;
