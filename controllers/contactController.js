const { catchAsync } = require("../utils/catchAsync");
const uuid = require("uuid").v4;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contactsModels");

const getContactsController = catchAsync(async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

const createContactController = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json(newContact);
});

const getByIdController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.status(200).json(contact);
});

const putContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  await updateContact(contactId, body);

  const updatedContact = await getContactById(contactId);

  res.status(200).json(updatedContact);
});

const deleteContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
});

module.exports = {
  getContactsController,
  getByIdController,
  createContactController,
  deleteContactController,
  putContactController,
};
