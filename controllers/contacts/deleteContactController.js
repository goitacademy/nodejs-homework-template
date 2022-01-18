const { removeContact } = require("../../models/contacts");
const notFoundRes = require("./notFoundRes");

async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const deletedContact = await removeContact(contactId);

  if (!deletedContact) {
    res.status(404).json(notFoundRes(contactId));
    return;
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
}

module.exports = deleteContactController;
