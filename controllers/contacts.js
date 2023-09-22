const ctrlWrap = require('../decorators/ctrl');
const {
  Contacts,
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateStatusSchema,
} = require('../schema/contacts');
const httpError = require('../helpers/HttpErr');

const getAllContacts = async (req, res) => {
  const contacts = await Contacts.find();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contacts.findById(contactId);

  if (!contact) {
    throw httpError(404);
  }

  res.json(contact);
};

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const contact = await Contacts.create(req.body);
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findByIdAndDelete(contactId);

  if (!contact) {
    throw httpError(404);
  }

  res.json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw httpError(400, 'missing fields');
  }

  const { error } = contactUpdateSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const { contactId } = req.params;

  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw httpError(400, 'missing field favorite');
  }

  const { error } = contactUpdateStatusSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const { contactId } = req.params;

  const contact = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw httpError(404);
  }

  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrap(getAllContacts),
  getContactById: ctrlWrap(getContactById),
  addContact: ctrlWrap(addContact),
  removeContact: ctrlWrap(removeContact),
  updateContact: ctrlWrap(updateContact),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
