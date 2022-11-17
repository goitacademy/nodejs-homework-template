const { Contact } = require("../models/contactModel");
const { createNotFoundError } = require("../helpers");

const listContacts = async (page, limit, favorite) => {
  const filterByFavorite = favorite === null ? {} : { favorite };
  const contacts = await Contact.find(filterByFavorite)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const counter = await Contact.countDocuments();

  return {
    contacts,
    totalPages: Math.ceil(counter / limit),
    currentPage: page,
  };
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundError());
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create({ name, email, phone, favorite });

  return res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (contact) {
    await Contact.findByIdAndDelete(contactId);
    return res.status(200).json({ message: "contact deleted" });
  }
  return next(createNotFoundError());
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  return res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  res.status(200).json(result);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
