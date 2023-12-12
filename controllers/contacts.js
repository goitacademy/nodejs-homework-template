const { ctrlWrapper, HttpError } = require("../helpers");
const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { _id: owner } = req.user;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner", "name, email");
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findById(contactId)
    .where("owner")
    .equals(owner)
    .populate("owner", "email");
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;
  const createdContact = await Contact.create({ name, email, phone, owner });
  res.status(201).json(createdContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const removedContact = await Contact.findByIdAndDelete(contactId)
    .where("owner")
    .equals(owner)
    .populate("owner", "email");
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  )
    .where("owner")
    .equals(owner)
    .populate("owner", "email");
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  )
    .where("owner")
    .equals(owner)
    .populate("owner", "email");
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
