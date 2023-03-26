const { catchAsync } = require("../utils");
const Contact = require("../models/contactsModel.js");

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find().select("-__v").sort({ name: 1 });

  res.status(200).json({
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.find({ _id: contactId }).select("-__v");
  res.status(200).json({
    contact,
  });
});

exports.addContact = catchAsync(async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  console.log("========CONTROLLEER=======");
  console.log("req.body", req.body);

  const newContact = await Contact.create({ name, email, phone, favorite });

  console.log("newContact from DB", newContact);

  res.status(201).json({
    newContact,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await Contact.findByIdAndRemove({ _id: contactId });

  res.sendStatus(204);
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  ).select("-__v");

  res.status(200).json({
    updatedContact,
  });
});
