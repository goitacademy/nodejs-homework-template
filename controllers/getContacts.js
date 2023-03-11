const { Contact } = require("../models/contact");

const getContacts = async (_, res) => {
  const result = await Contact.find({}, "name email phone"); // * Использовать для выбора передачи полей,
  // * если передать все кроме каких-то использовать "-", например -id, -name
  res.json(result);
};

module.exports = getContacts;
