const { RequestError } = require('../helpers');
const { contactsServices } = require('../services');

const getContactsListController = async (req, res, next) =>
  res.json(await contactsServices.getContacts());

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;

  const [findedContact] = await contactsServices.getContactById(id);

  if (!findedContact) {
    throw RequestError(404);
  }

  return res.json(findedContact);
};

const addContactController = async (req, res, next) => {
  const newContactData = req.body;
  const { name, email, phone } = newContactData;

  switch (true) {
    case Boolean(!name):
      throw RequestError(400, 'missing required name field');

    case Boolean(!email):
      throw RequestError(400, 'missing required email field');

    case Boolean(!phone):
      throw RequestError(400, 'missing required phone field');

    default:
      break;
  }

  const addedContact = await contactsServices.addContact(newContactData);

  return res.json({ addedContact }).status(201);
};

const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;

  const isDeleted = await contactsServices.deleteContact(id);

  if (!isDeleted) {
    throw RequestError(404);
  }

  return res.json({ message: 'Contact deleted' });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const newContactData = req.body;
  const { name, email, phone } = newContactData;

  if (!name && !email && !phone) {
    throw RequestError(400, 'missing fields');
  }

  const contact = await contactsServices.updateContactById(id, newContactData);

  if (!contact) {
    throw RequestError(404);
  }

  return res.json({ contact });
};

const updateStatusContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  if (!favorite) {
    throw RequestError(400).message({ message: 'missing field favorite' });
  }

  const updateStatus = await contactsServices.updateContactById(id, { favorite });

  if (!updateStatus) {
    throw RequestError(404);
  }

  return res.json({ updateStatus });
};

module.exports = {
  getContactByIdController,
  getContactsListController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
