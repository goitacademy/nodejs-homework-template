const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../models/contacts");

const getContactsListController = async (req, res, next) => {

  const contacts = await listContacts();
  if (!contacts) {
    return res
      .status(400)
      .json({ message: `Contacts not found, something wrong` });
  }
  res.json({ contacts, message: "Success!" });
};

const getContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: `Contact not found` });
  }
  res.json({ contact, message: "Success!" });
};

const addContactController = async (req, res, next) => {
  const newContact = req.body;

  if (!newContact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  await addContact(newContact);
  res.json({ newContact, message: "Success, contact added" });
};

const deleteContactController = async (req, res, next) => {
  const { contactId: id } = req.params;

  const contact = await removeContact(id);
  if (!contact) {
    return res.status(404).json({ message: `Not found` });
  }
  res.json({ contact, message: "Contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const updatedContact = req.body;

  if (!updatedContact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const contact = await updateContact(id, updatedContact);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ contact, message: "Success, contact updated" });
};

const updateContactStatusController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const newStatus = req.body;

  const contact = await updateContactStatus(id, newStatus);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ contact, message: "Success, contact's status updated" });
};

module.exports = {
  getContacts: getContactsListController,
  getContactById: getContactByIdController,
  addContact: addContactController,
  removeContact: deleteContactController,
  updateContact: updateContactController,
  updateContactStatus: updateContactStatusController,
};
