const { listContacts, removeContact } = require("../../service/contacts");

const deleteContact = async (req, res) => {
  const contacts = await listContacts();
  if (contacts.every(({ id }) => id !== req.params.contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  const data = await removeContact(req.params.contactId);
  res.json({
    message: `Contact with ID:${data.id} name:${data.name} deleted!`,
  });
};
module.exports = deleteContact;
