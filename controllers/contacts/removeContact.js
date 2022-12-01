const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts.js");

async function removeContact(req, res) {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
}

module.exports = removeContact;
