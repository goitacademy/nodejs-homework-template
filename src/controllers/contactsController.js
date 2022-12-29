const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: contacts,
  });
};

const getContactById = async (req, res) => {
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
  await addContact(req.body);
  res.status(201).json({
    status: 'contact added successfully',
    code: 201,
  });
};

const putContact = async (req, res) => {
  const {id} = req.params;

  await updateContact(id, req.body);

  res.status(200).json({
    status: 'contact update',
    code: 200,
  });
};

const deleteContact = async (req, res, next) => {
  const {id} = req.params;
  console.log(id);
  const contact = await getById(id);

  if (!contact) {
    res.status(400).json({message: 'Not found'});
    return;
  }

  await removeContact(id);

  res.status(200).json({message: 'contact deleted'});
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
};
