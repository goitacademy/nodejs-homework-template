const { isValidObjectId } = require("mongoose");
const {
  Contact,
  addSchema,
  updateFavoriteSchema,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const isValidId = isValidObjectId(contactId);
  if (!isValidId) {
    res.status(400).json({ message: `${contactId} isn't a valid contactId!` });
    return;
  }

  const contact = await Contact.findById(contactId);
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const body = req.body;
  const { error } = addSchema.validate(body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const isValidId = isValidObjectId(contactId);
  if (!isValidId) {
    res.status(400).json({ message: `${contactId} isn't a valid contactId!` });
    return;
  }

  const deletedContact = await Contact.findByIdAndDelete(contactId);
  res.json(deletedContact);
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const isValidId = isValidObjectId(contactId);
  if (!isValidId) {
    res.status(400).json({ message: `${contactId} isn't a valid contactId!` });
    return;
  }

  const body = req.body;
  const { error } = addSchema.validate(body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  res.json(updatedContact);
};

const updateContactFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const isValidId = isValidObjectId(contactId);
  if (!isValidId) {
    res.status(400).json({ message: `${contactId} isn't a valid contactId!` });
    return;
  }

  const body = req.body;
  const { error } = updateFavoriteSchema.validate(body);

  if (error) {
    res.status(400).json({ message: "missing required favourite field" });
    return;
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  res.json(result);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
};
