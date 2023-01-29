const contacts = require("../../models/contacts.json");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const removeContacts = contacts.find(({ id }) => id === req.params.contactId);
  if (!removeContacts) {
    throw createError(404, "Not found");
  }
  const newContacts = contacts.filter(({ id }) => id !== req.params.contactId);
  res.status(200).json({
    status: "succses",
    code: 200,
    message: "contact deleted",
    data: newContacts,
  });
};
module.exports = removeContact;
