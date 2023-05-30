const { decorCtrlWrapp } = require('../decorators');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const allContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with this ID:${contactId} is not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const body = req.body;
  const result = await addContact(body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Operation fault, contact with this ID:${contactId} is not found`);
  }
  res.json({ message: 'contact deleted' });
};

const changeContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const result = await updateContact(contactId, body);
  if (!result) {
    throw HttpError(404, `Contact with this ID:${contactId} is not found`);
  }
  res.json(result);
};

module.exports = {
  addNewContact: decorCtrlWrapp(addNewContact),
  allContacts: decorCtrlWrapp(allContacts),
  contactById: decorCtrlWrapp(contactById),
  deleteContactById: decorCtrlWrapp(deleteContactById),
  changeContact: decorCtrlWrapp(changeContact),
};
