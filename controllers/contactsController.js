const Contact = require("../models/contactsModel");
const { catchAsync } = require("../utils");
const contactService = require("../services/contactServices");

/**
 * Create new contact controller
 */
exports.addContact = catchAsync(async (req, res) => {
  // const newContact = new Contact(req.body);
  // await newContact.save();

  const newContact = await Contact.create(req.body);
  newContact.password = undefined;

  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
});

/**
 * Find all contact controller
 */
exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

/**
 * Find contact by id controller
 */
exports.getContactById = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

/**
 * Update contact controller
 */
exports.updateContact = catchAsync(async (req, res) => {
  // const { id } = req.params;

  const updateContact = await contactService.updateContacts(
    req.params.id,
    req.body
  );

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

/**
 * Update Favorite controller
 */
exports.updateContactFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

/**
 * Delete contact controller
 */
exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});
