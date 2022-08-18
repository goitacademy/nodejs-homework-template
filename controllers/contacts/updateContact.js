const operations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const newContact = await operations.updateContact(contactId, req.body);
  if (!newContact) {
    throw new NotFound(`Contacts with id ${contactId} not found`);
  }
  res.json({
    status: "Success",
    message: "Contact successfully updated",
    code: 200,
    data: newContact,
  });
};
module.exports = updateContact;
