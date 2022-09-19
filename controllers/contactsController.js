const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const {
  GetContactError,
  PostContactError,
  DeleteContactError,
  PutContactError,
} = require("../helpers/errors");

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite } = req.query;
  if (page <= 0) {
    throw new GetContactError("Page must be greater then 0");
  }
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const data = await listContacts({ owner, favorite }, { skip, limit });

  if (!data.length) {
    throw new GetContactError("Not found");
  }

  res.status(200).json({
    data,
  });
};

const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const data = await getContactById(contactId, _id);

  if (!data || !data.length) {
    throw new GetContactError("Not found");
  }

  res.status(200).json({
    data,
  });
};

const addContactToListController = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;

  const contact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
    owner: _id,
  };

  const data = await addContact(contact);

  if (data.length) {
    throw new PostContactError("Error");
  }
  res.status(201).json({ data });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const data = await removeContact(contactId, _id);

  if (!data || data.length) {
    throw new DeleteContactError("Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const data = await updateContact(contactId, req.body, _id);

  if (!data || !data.length) {
    throw new PutContactError("Not found");
  }

  res.status(200).json({ message: data });
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const data = await updateStatusContact(contactId, req.body, _id);

  if (!data || !data.length) {
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
  updateStatusContactController,
};
