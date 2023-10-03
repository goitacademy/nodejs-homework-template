const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, ...filters } = req.query;
    const skip = (page - 1) * limit;
    const query = { owner, ...filters };

    let contacts;

    if (Object.keys(filters).length > 0) {
      contacts = await Contact.find(query, '-__v', { skip, limit }).populate(
        'owner',
        'email subscription'
      );
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
  const { _id: currentUser } = req.user;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, 'Not found');
  }
  const { owner } = oneContact;
  if (!owner || owner.toString() !== currentUser.toString()) {
    res.status(403).json({ message: 'Access is denied' });
  } else {
    res.status(200).json(oneContact);
  }
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  console.log(req.body);
  console.log(req.file);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: currentUser } = req.user;

  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, owner: currentUser });

  if (!deletedContact) {
    throw HttpError(404, 'Contact not found or access denied');
  }
  res.status(200).json({ message: 'Contact deleted' });
};

const renewContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing fields');
  }
  const { contactId } = req.params;
  const { _id: currentUser } = req.user;

  const renewedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: currentUser },
    req.body,
    { new: true }
  );

  if (!renewedContact) {
    throw HttpError(404, 'Contact not found or access denied');
  }
  res.status(200).json(renewedContact);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing favorite field');
  }

  const { contactId } = req.params;
  const { _id: currentUser } = req.user;

  const renewedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: currentUser },
    req.body,
    { new: true }
  );

  if (!renewedContact) {
    throw HttpError(404, 'Contact not found or access denied');
  }
  res.status(200).json(renewedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  renewContact: ctrlWrapper(renewContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
