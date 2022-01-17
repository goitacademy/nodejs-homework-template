const { updateContact } = require("../../models/contacts");
const successRes = require("./successRes");
const notFoundRes = require("./notFoundRes");

async function putContactController(req, res) {
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    res.status(404).json(notFoundRes(contactId));
    return;
  }

  res.json(successRes(updatedContact));
}

module.exports = putContactController;
