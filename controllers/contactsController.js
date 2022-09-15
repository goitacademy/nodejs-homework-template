const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const {
  GetContactError,
  PostContactError,
  DeleteContactError,
  PutContactError,
} = require("../helpers/errors");

const getContactsController = async (_, res) => {
  const data = await listContacts();
  if (data === "ENOENT") {
    throw new GetContactError("Not found");
  }

  res.status(200).json({
    data,
  });
};

const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw new GetContactError("Not found");
  }

  res.status(200).json({
    data,
  });
};

const addContactToListController = async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };

  const data = await addContact(contact);

  if (data.length) {
    throw new PostContactError("Error");
  }
  res.status(201).json({ data });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (data.length) {
    throw new DeleteContactError("Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (data.length) {
    throw new PutContactError("Not found");
  }

  res.status(200).json({ message: data });
};

module.exports = {
  getContactsController,
  getContactController,
  addContactToListController,
  deleteContactController,
  changeContactController,
};
