const contacts = require("../../models/contacts");

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);

  return res.status(201).json(result);
};

module.exports = add;
