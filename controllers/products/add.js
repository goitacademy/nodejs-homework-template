const createError = require("http-errors");

const contacts = require("../../models/contacts");

const add = async (req, res) => {
  const { name, phone, email } = req.body;
  const result = await contacts.addContact({ name, phone, email });
  res.status(201).json(result);
};

module.exports = add;
