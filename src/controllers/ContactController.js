const {
  addContact,
  removeContact,
  getContactById,
  getContacts,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const getContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 5, favorite = "default" } = req.query;

  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);

  const contacts = await getContacts(owner, {
    favorite,
    skip: (parseInt(page) - 1) * parseInt(limit),
    limit: parseInt(limit),
  });

  res.status(200).json(contacts);
};

const fetchContactByIdController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contact = await getContactById(owner, contactId);

  res.status(200).json({ contact });
};

const createContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;

  const contact = await addContact(owner, { name, email, phone });

  res.status(201).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await removeContact(owner, contactId);

  res.status(200).json(result);
};

const editContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { body } = req;
  const { contactId } = req.params;

  const contact = await updateContact(owner, contactId, body);

  res.status(200).json({ contact });
};

const patchContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { body } = req;
  const { contactId } = req.params;

  const contact = await updateStatusContact(owner, contactId, body);

  res.status(200).json({ contact });
};

module.exports = {
  getContactController,
  fetchContactByIdController,
  createContactController,
  deleteContactController,
  editContactController,
  patchContactController,
};
