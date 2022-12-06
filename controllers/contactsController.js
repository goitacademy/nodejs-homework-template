const contactsModel = require('../models/contacts')

const getAllContacts = async (req, res) => {
  const contacts = await contactsModel.listContacts();
  const code = 200;
  res.status(code);
  res.json({
    data: {contacts},
    message: '',
    status: 'success', code
  });
}

const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.getContactById(contactId);

  if (!contact) {
    notFoundId(res, contactId);
    return;
  }

  const code = 200;
  res.status(code);
  res.json({
    data: {contact},
    message: '',
    status: 'success', code
  });
}

const addContact = async (req, res) => {
  const {name, email, phone} = req.body;
  const contact = await contactsModel.addContact({name, email, phone});

  const code = 201;
  res.status(code);
  res.json({
    data: {contact},
    message: `Contact by id: ${contact.id} has been added`,
    status: 'success', code
  });
}

const delContactById = async (req, res) => {
  const {contactId} = req.params
  const contact = await contactsModel.removeContact(contactId);
  if (!contact) {
    notFoundId(res, contactId);
    return;
  }

  const code = 200;
  res.status(code);
  res.json({
    data: {contact},
    message: `Contact by id: ${contact.id} has been deleted`,
    status: 'success', code
  });
}

const updateContactById = async (req, res) => {
  const {contactId} = req.params
  const contact = await contactsModel.removeContact(contactId);
  if (!contact) {
    notFoundId(res, contactId)
    return;
  }

  const code = 200;
  res.status(code);
  res.json({
    data: {contact},
    message: `Contact by id: ${contact.id} has been update`,
    status: 'success', code
  });
}

module.exports = {
  getAllContacts, getContactById, addContact, delContactById, updateContactById
}

function notFoundId(res, id) {
  const code = 404;
  res.status(code);
  res.json({
    data: {},
    message: `Contact by id: ${id} hasn't been found`,
    status: 'error', code
  });
}
