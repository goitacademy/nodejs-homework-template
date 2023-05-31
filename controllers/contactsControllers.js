const { HttpError } = require("../utils");
const { asyncWrapper } = require("../utils");
const {Contact} = require("../models/contactMongooseSchema")

// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContactById,
// } = require("../models/contacts");

const getListContacts = asyncWrapper(async (req, res, next) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
});

const getOneContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw new HttpError(404);
  }
  res.status(200).json(oneContact);
});

const addNewContact = asyncWrapper(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

const deleteContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw new HttpError(404);
  }
  res.status(200).json({
    message: "contact deleted",
  });
});

const updateContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!updatedContact) {
    throw new HttpError(404);
  }
  res.status(200).json(updatedContact);
});

const updateFavourite = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!updatedContact) {
    throw new HttpError(404);
  }
  res.status(200).json(updatedContact);
});


module.exports = {
  getListContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContact,
  updateFavourite,
};
