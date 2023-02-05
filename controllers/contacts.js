const { HttpError } = require('@root/helpers');
const { ContactModel } = require('@root/models');

async function getAllContacts(req, res, next) {
  let filterObject = {};
  let optionsObject = {};
  const { favorite, page, limit } = req.query;

  // form pagination options object for mongoose
  if (page && limit)
    optionsObject = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

  // form filter object for mongoose
  if (favorite !== undefined)
    filterObject = {
      favorite: favorite === 'true',
    };

  // get contacts with optional filters and pagination
  const contacts = await ContactModel.find(filterObject, '', optionsObject);

  res.status(200).json(contacts);
}

async function getContactByID(req, res, next) {
  const contact = await ContactModel.findById(req.params.contactId);
  if (!contact) throw new HttpError(404);

  res.json(contact);
}

async function addContact(req, res, next) {
  const addedContact = await ContactModel.create(req.body);

  res.status(201).json(addedContact);
}

async function deleteContactByID(req, res, next) {
  const deletedContact = await ContactModel.findByIdAndRemove(
    req.params.contactId
  );
  if (!deletedContact) throw new HttpError(404);

  res.status(200).json({ message: 'contact deleted' });
}

async function updateContact(req, res, next) {
  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!updatedContact) throw new HttpError(404);

  res.status(200).json(updatedContact);
}

async function updateStatus(req, res, next) {
  updateContact(req, res, next);
}

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
};
