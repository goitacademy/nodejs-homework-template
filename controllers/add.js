const contacts = require("../models/contacts");

const add = async (req, res) => {
  const body = req.body;

  const result = await contacts.addContact(body);
  res.status(201).json(result);
};

module.exports = add;
