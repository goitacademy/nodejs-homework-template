<<<<<<< Updated upstream
// const fs = require('fs/promises')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}
=======
const { Contact } = require("../models/schems/schems");
const { httpError, ctrlWrapper } = require("../helpers/index");
const listContacts = async () => {
  const data = await Contact.find();

  return data;
};

// отримує контакт по ід;
const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const contacts = await listContacts();
  const idx = await Contact.findByIdAndDelete(req.params.contactId);
  if (!idx) {
    res.status(404).json({
      code: 404,
      message: `ID ${req.params.contactId} not found`,
    });
  }
  const removedContact = contacts.splice(idx, 1);
  console.log(removedContact);
  res.status(201).json(removedContact);
};

const addContact = async (req, res) => {
  const data = await Contact.create({ ...req.body });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const data = await Contact.findByIdAndUpdate(
    req.params.contactId,
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!data) {
    res.status(404).json({
      code: 404,
      message: `ID ${req.params.contactId} not found`,
    });
  }
  res.status(200).json(data);
};
>>>>>>> Stashed changes

const updateFavoriteToContact = async (req, res, next) => {
  const {contactId } = req.params;

  const info = req.body;
  try {
    if (!Object.keys(info).includes("favorite")) {
      res.status(400).json({ message: "Missing field favorite." });
    }
    const result = await Contact.findByIdAndUpdate(contactId, info);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }};

module.exports = {
  listContacts,
<<<<<<< Updated upstream
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
=======
  getAll: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoriteToContact: ctrlWrapper(updateFavoriteToContact),
};
>>>>>>> Stashed changes
