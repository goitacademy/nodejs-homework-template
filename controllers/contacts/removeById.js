const contacts = require("../../models/contacts");

const removeById = async (req, res) => {
  await contacts.removeContact(req.params.contactId);
  res.json("Contact deleted");
};

module.exports = removeById;
