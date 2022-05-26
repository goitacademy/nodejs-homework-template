const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts, status: 'succes' });
};

const getOneContact = async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);

  if (!contactById) {
    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  }
  res.json({ contactById, status: 'succes' });
};

const deleteContact = async (req, res, next) => {
  const removeById = await removeContact(req.params.contactId);
  if (!removeById) {
    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  }
  res.json({ removeById, status: 'succes' });
};

const addOneContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      status: 'error',
      message: 'missing required name field',
    });
  }
  const newContent = await addContact(name, email, phone);
  res.status(201).json({
    massage: newContent,
    status: 'succes',
  });
};
const updateOneContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const isId = await getContactById(req.params.contactId);
  if (!name && !email && !phone) {
    return res.status(400).json({
      status: 'error',
      message: 'missing fields',
    });
  } else if (!isId) {
    return res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  } else {
    const afterupdateContact = await updateContact(req.params.contactId, req.body);

    res.status(200).json({
      message: afterupdateContact,
      status: 'succes',
    });
  }
};

module.exports = { getContacts, getOneContact, deleteContact, addOneContact, updateOneContact };
