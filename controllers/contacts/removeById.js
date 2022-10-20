const contactsOperations = require("../../models/contacts");

const removeById = async (req, res) => {
  const removedContact = await contactsOperations.removeContact(
    req.params.contactId
  );
  if (removedContact.length === 0) {
    return res.status(404).json({ message: "Не знайдено" });
  }
  res.json({ message: "Контакт видалено" });
};

module.exports = removeById;
