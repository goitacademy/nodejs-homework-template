const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findOne({ _id: contactId });
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(oneContact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!updateStatusContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateStatusContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
