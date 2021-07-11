// const fs = require('fs/promises')
const contacts = require('./contacts.json')

const listContacts = async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
  next();
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectContacts = contacts.find((item) => item.id === Number(contactId));
  if (!selectContacts) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact with this id not found'
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContacts,
    },
  });
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
