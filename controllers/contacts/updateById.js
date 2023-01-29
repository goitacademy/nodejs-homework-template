const contacts = require("../../models/contacts.json");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const [contact] = contacts.filter(
    (contact) => contact.id === req.params.contactId
  );
  if (!contact) {
    throw createError(404, "Not found");
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  res.status(200).json({
    code: 200,
  });
};

module.exports = updateContact;
