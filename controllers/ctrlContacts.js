const { ContactModel } = require('../models');
// const modelsContacts = require('../models/contacts');
const { ctrlWrapper, HttpError } = require('../utils');

/**
 * @ GET /api/contacts
 * @param {*} req
 * @param {*} res
 */
const listContacts = async (req, res) => {
  // const result = await modelsContacts.listContacts();

  const result = await ContactModel.find().select('-__v');

  res.status(200).json(result);
};

/**
 * @ POST /api/contacts
 * @param {*} req
 * @param {*} res
 */

const addContact = async (req, res) => {
  // const result = await modelsContacts.addContact(req.body);

  const result = await ContactModel.create(req.body);

  res.status(201).json(result);
};

/**
 * @ GET /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  // const result = await modelsContacts.getContactById(contactId);

  const result = await ContactModel.findOne({ _id: contactId });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json(result);
};

/**
 * @ DELETE /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  // const result = await modelsContacts.removeContact(contactId);

  const result = await ContactModel.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted' });
};

/**
 * @ PUT /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  // const result = await modelsContacts.updateContact(contactId, body);

  const result = await ContactModel.findByIdAndUpdate({ _id: contactId }, body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json(result);
};

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const body = req.body;

//   const result = await ContactModel.findByIdAndUpdate({ _id: contactId }, body, { new: true });
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

module.exports = {
  ctrlListContacts: ctrlWrapper(listContacts),
  ctrlAddContact: ctrlWrapper(addContact),
  ctrlGetContactById: ctrlWrapper(getContactById),
  ctrlRemoveContact: ctrlWrapper(removeContact),
  ctrlUpdateContact: ctrlWrapper(updateContact),
};
