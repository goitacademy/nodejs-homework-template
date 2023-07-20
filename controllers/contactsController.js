const Contact = require("../models/contactsModel");
const { catchAsync, AppError } = require("../utils");

/**
 * Create new contact controller
 */
exports.addContact = catchAsync(async (req, res) => {
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
  const { id } = req.params;

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
    },
    { new: true }
  );

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
