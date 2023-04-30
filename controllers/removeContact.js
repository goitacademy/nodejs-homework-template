const { deleteContact } = require("../models/contacts");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await deleteContact(contactId);
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
