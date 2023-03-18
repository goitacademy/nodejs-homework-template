const catchAsync = require("../utils/catchAsync");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contactsModels");

const getListContactsController = catchAsync(async (req, res) => {
  console.log("==>getListContactsController");
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

const addContactController = catchAsync(async (req, res) => {
  const { body } = req;

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
});

const getByIdController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contact);
});

const putContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  await updateContact(contactId, body);

  const updatedContact = await getContactById(contactId);

  res.status(200).json(updatedContact);
});

const removeContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getListContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  putContactController,
};
