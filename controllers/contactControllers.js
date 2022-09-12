const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contactsDAL");

const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  res.status(200).json(contact);
};

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);

  res.status(200).json({ message: "success", newContact });
};

const deleteContactController = async (req, res, next) => {
  const id = req.params.contactId;
  await deleteContact(id);

  res.status(200).json({ message: "contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = await updateContact(id, req.body);

  res.status(200).json({ message: "success", updatedContact });
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
};
