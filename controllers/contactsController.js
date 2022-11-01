const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const listContactsController = async (req, res) => {
  const contacts = await getListContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.json({
      message: "contact deleted",
      contact,
    });
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateStatusContact(contactId, req.body);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
