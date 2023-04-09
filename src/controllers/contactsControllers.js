const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const getContactsController = async (_, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });

  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const createdContact = await Contact.create(req.body);
  res.status(201).json(createdContact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.status(200).json(updatedContact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

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

  if (!updatedFavoritContact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

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
