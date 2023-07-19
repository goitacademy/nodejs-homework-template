const Contact = require('../models/contactModel');
const { catchAsync } = require('../utils');

/**
 * Create new contact controller.
 */
exports.createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  newContact.password = undefined;

  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});

/**
 * Find all contacts controller.
 */
exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

/**
 * Find contact by id controller.
 */
exports.getOneContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

/**
 * Update contact controller.
 */
exports.updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );

  res.status(200).json({
    msg: 'Success',
    contact: updatedContact,
  });
});

/**
 * Delete contact controller.
 */
exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});

/**
 * Update contact status controller.
 */
exports.updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite: req.body.favorite },
    { new: true }
  );

  res.status(200).json({
    msg: 'Success',
    contact: updatedContact,
  });
});
