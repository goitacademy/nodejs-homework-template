const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const listContactsController = async (req, res) => {
  const { user } = req;
  const contacts = await getListContacts(user.id);
  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await getContactById({ contactId, userId: user.id });
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await removeContact({ contactId, userId: user.id });
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
  const { user } = req;

  const contact = await addContact({ body: req.body, userId: user.id });
  res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await updateContact({ contactId, userId: user.id }, req.body);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: `Contact with id: ${contactId} not found` });
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await updateStatusContact(
    { contactId, userId: user.id },
    req.body
  );
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
