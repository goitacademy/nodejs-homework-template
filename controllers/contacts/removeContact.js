const operations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const oldContact = await operations.removeContact(contactId);
  if (!oldContact) {
    throw new NotFound(`Contacts with id ${contactId} not found`);
  }

  res.json({
    status: "Success",
    message: "Contact successfully deleted",
    code: 200,
    data: oldContact,
  });
};
module.exports = removeContact;
