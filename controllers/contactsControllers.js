const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts.js");

const {isEmpty} = require('../helpers/apiHelpers');
const {contactValidation} = require('../middlewares/validationMiddleware');


const listContactsController = async (_, res) => {
  const data = await listContacts();
  res.status(200).json(data);
};

const getContactByIdController = async (req, res) => {
  const {contactId: id} = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { error, value } = contactValidation.validate(req.body);
  const {name, email, phone} = req.body;
  const missing = !name || !email || !phone;
  if (missing) {
    return res.status(400).json({message: `missing ${missing} field`});;
  }
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
}

const removeContactController = async (req,res) => {
  const {contactId: id} = req.params;
  const contactRemove = await removeContact(id);
  if (!contactRemove) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  return res.status(200).json({
    message:  "Contact deleted",
  });
}

const updateContactController = async (req, res) => {
  const {contactId: id} = req.params;
  
  if (isEmpty(req.body)) {
    return res.status(400).json({
      message: 'missing fields',
    });
  }
  const updatedContact = await updateContact(id, req.body);
  if (!updatedContact) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  return res.status(200).json(updatedContact);
}

module.exports = {
    listContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController
}