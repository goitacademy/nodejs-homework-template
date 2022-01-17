const { getContactById } = require("../../models/contacts");
const successRes = require("./successRes");
const notFoundRes = require("./notFoundRes");

async function getContactByIdController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json(notFoundRes(contactId));
    return;
  }

  res.json(successRes(contact));
}

module.exports = getContactByIdController;
