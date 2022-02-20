const {
  listContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContactById,
  removeContactById,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();

  if (!contacts) {
    return res.status(400).json({ message: "Contacts not found" });
  }

  res.status(200).json({ contacts });
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }

  res.status(200).json({ contact });
};

const addPostController = async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const changePostController = async (req, res, next) => {
  const { contactId } = req.params;
  const changeContact = await changeContactById(contactId, req.body);

  if (!changeContact) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json(changeContact);
};

const patchPostController = async (req, res, next) => {
  const { contactId } = req.params;
  const updateContact = await patchContactById(contactId, req.body);

  if (!updateContact) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json(updateContact);
};

const removePostController = async (req, res, next) => {
  const { contactId } = req.params;
  await removeContactById(contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addPostController,
  changePostController,
  patchPostController,
  removePostController,
};
