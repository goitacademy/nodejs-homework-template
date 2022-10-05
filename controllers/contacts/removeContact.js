const contactsMethods = require("../../models/contacts")
const { RequestError } = require("../../helpers")

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contactsMethods.removeContact(contactId);
  if (!removedContact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
}

module.exports = removeContact;