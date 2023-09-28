const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let contacts;

    if (req.query) {
      const filterKeys = Object.keys(req.query);
      const filterValues = Object.values(req.query);
      contacts = await Contact.find({ owner, [filterKeys[0]]: filterValues[0] }, '-__v', {
        skip,
        limit,
      }).populate('owner', 'email subscription');
    } else {
      contacts = await Contact.find({ owner }, '-__v', { skip, limit }).populate(
        'owner',
        'email subscription'
      );
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(oneContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({ message: 'Contact deleted' });
};

const renewContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing fields');
  }

  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing favorite field');
  }

  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  renewContact: ctrlWrapper(renewContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
