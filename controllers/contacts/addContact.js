const contacts = require("../../models/contacts/index");

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  console.log(req);
  console.log("Privet");
  res.status(201).json(result);
};

module.exports = addContact;
