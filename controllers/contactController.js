const { catchAsync } = require('../utils') 
const Contact = require('../models/contactModel')

/**
 * Get contacts list.
 */
exports.listContacts = catchAsync(async (req, res) => {
  
  const contacts = await Contact.find().select('-__v');
  
  res.status(200).json(
    contacts,
  );
});

/**
 * Create contact.
 */
exports.addContact = catchAsync(async (req, res) => {
    
  const newContact = await Contact.create(req.body);

  res.status(201).json(
    newContact
  );
});

/**
 * Get contact by id.
 */
exports.getById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id).select('-__v');

  res.status(200).json(
    contact
  );
});

/**
 * Update contact by id.
 */
exports.updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(id, {
    name, email, phone, favorite
  }, { new: true });

  res.status(200).json(
    updatedContact
  );
});

/**
 * Delete contact by id.
 */
exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);
  
  res.status(200).json({
    "message": "contact deleted"
  });
});
