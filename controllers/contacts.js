const { Contact } = require('../models/contact');

const { httpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  // If you want to return some exact fields - use:
  // Contact.find({}, "name email")
  // If you don't want to return some field - use:
  // Contact.find({}, '-name -email');
  const allContacts = await Contact.find();
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  // Or use this: Contact.findOne({ _id: contactId });
  if (!contact) {
    throw httpError(404, 'Not found');
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  console.log(newContact);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  // {new: true} returns updated document
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  // {new: true} returns updated document
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  // Or you can use Contact.findByIdAndDelete(contactId)
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw httpError(404, 'Not found');
  }
  /* If res.status(204).send() there is no status body */
  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
