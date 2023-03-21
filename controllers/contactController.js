const catchAsync = require("../utils/catchAsync");
const Contact = require("../models/contactsModel");

const getListContactsController = catchAsync(async (req, res) => {
  console.log("==>getListContactsController");
  const contacts = await Contact.find().select("-__v");

  res.status(200).json(contacts);
});

const addContactController = catchAsync(async (req, res) => {
  const { body } = req;

  const addedContact = await Contact.create(body);

  res.status(201).json(addedContact);
});

const getByIdController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).select("-__v");

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contact);
});

const putContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select("-__v");

  res.status(200).json(updatedContact);
});

const removeContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "Deleted successfully" });
});

// PATCH
const updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  console.log("==>contactId", contactId);
  console.log("==>favorite", favorite);

  const updatedStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    favorite,
    {
      new: true,
    }
  ).select("-__v");

  res.status(200).json(updatedStatusContact);
});

module.exports = {
  getListContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  putContactController,
  updateStatusContact,
};
