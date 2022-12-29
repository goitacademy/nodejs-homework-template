const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  console.log(contacts);
  res.json({
    status: 'success',
    code: 200,
    data: contacts,
  });
};

const getContactById = async (req, res, next) => {
  const {id} = req.params;
  const contact = await getById(id);

  if (!contact) {
    res.status(400).json({message: 'Not found'});
    return;
  }

  res.json({
    status: 'success',
    code: 200,
    data: contact,
  });
};

const postContact = async (req, res, next) => {
  const contacts = await addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: contacts,
  });
};

const putContact = async (req, res) => {
  const {id} = req.params;

  const contacts = await updateContact(id, req.body);
  console.log(contacts);

  res.json({
    status: 'success',
    code: 200,
    data: contacts,
  });
};

const deleteContact = async (req, res, next) => {
  const {id} = req.params;
  const contact = await removeContact(id);

  if (!contact) {
    res.status(400).json({message: 'Not found'});
    return;
  }

  res.status(200).json({message: 'contact deleted'});
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
};
