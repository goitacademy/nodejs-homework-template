const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const result = await Contact.find({}, '-createdAt, -updatedAt');
    res.status(200).json(result);
};

const getContactByID = async (req, res) => {
    const { contactId } = req.params;
    const user = await Contact.findById(contactId, '-createdAt, -updatedAt');

    if (!user) {
      throw HttpError(404, "User was not found!");
    }

    res.status(200).json(user);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw HttpError(404, "User was not found!");
    }

    res.json({ message: "Delete success" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!result) {
      throw HttpError(404, "User was not found!");
    }

    res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!result) {
    throw HttpError(404, "Not found!");
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactByID: ctrlWrapper(getContactByID),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};