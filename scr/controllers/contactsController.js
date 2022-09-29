const {
  getContacts,
  addContact,
  getContactById,
  deleteContactById,
  putContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const data = await getContacts();
  res.json({ data });
};

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const data = await addContact({ name, email, phone });
  res.status(201).json(data);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ data });
};

const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactById(contactId);
  res.json({ message: "contact deleted" });
};

const putContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  await putContactById(contactId, { name, email, phone });
  const data = await getContactById(contactId);
  res.json({ data });
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  await updateStatusContact(contactId, favorite);
  const data = await getContactById(contactId);
  res.json({ data });
};

module.exports = {
  getContactsController,
  addContactController,
  getContactByIdController,
  deleteContactByIdController,
  putContactByIdController,
  updateStatusContactController,
};
