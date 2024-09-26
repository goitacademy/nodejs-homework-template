const { Contact } = require('../models/contact');
const { ctrlWrapper } = require('../helpers');
const checkContactExists = require('../utils/checkContactExists');

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if ('favorite' in req.query) {
    filter.favorite = favorite;
  }

  const contacts = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.status(200).json(contacts);
};

const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });

  checkContactExists(contact, contactId);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const createdContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(createdContact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  checkContactExists(updatedContact, contactId);

  res.status(200).json(updatedContact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  checkContactExists(deletedContact, contactId);

  res.status(200).json({
    message: 'contact deleted',
    contact: deletedContact,
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedFavoritContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  checkContactExists(updatedFavoritContact, contactId);

  res.status(200).json(updatedFavoritContact);
};

module.exports = {
  getContactsController: ctrlWrapper(getContactsController),
  getContactController: ctrlWrapper(getContactController),
  addContactController: ctrlWrapper(addContactController),
  updateContactController: ctrlWrapper(updateContactController),
  removeContactController: ctrlWrapper(removeContactController),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
