const {
  asyncMiddleware,
  notFoundMessage
} = require('../helpers/controller-helpers');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../models/contacts');

const getAllContacts = async (_, res) => {
    const contacts = await listContacts();
    res.status(200).json(contacts);
};

const getById = async ({params}, res) => {
    const { contactId } = params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json(notFoundMessage);
      return;
    }
    res.status(200).json(contact);
};

const add = async (req, res) => {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
};

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return res.status(404).json(notFoundMessage);
    }
    res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json(notFoundMessage);
    }
    res.status(200).json(updatedContact);
};

async function updateStatus(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await updateStatusContact(contactId, { favorite });

  if (!contact) {
    res.status(404).json(notFoundMessage);
    return;
  }

  res.status(200).json(contact);
}

module.exports = {
  listContactsController: asyncMiddleware(getAllContacts),
  getContactByIdController: asyncMiddleware(getById),
  addContactController: asyncMiddleware(add),
  deleteContactController: asyncMiddleware(remove),
  updateContactController: asyncMiddleware(update),
  updateStatusController: asyncMiddleware(
    updateStatus
  ),
};