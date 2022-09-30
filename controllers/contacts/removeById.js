const contactsOperations = require("../../models/contacts");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  contact
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
};

module.exports = removeById;