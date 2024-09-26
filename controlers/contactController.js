const bcrypt = require('bcrypt');
const { catchAsync } = require('../utils');

const contactService = require('../services/contactServices');

exports.createContact = catchAsync(async (req, res) => {


  const newContact = await Contact.create(req.body);

  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});

//Find all contacts controller//
exports.getAllContacts = catchAsync(async (req, res) => {
  // const contacts = await Contact.find();
  const contacts = await contactServise.getAllContacts();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});
//Update contact controller//
exports.getOneContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

exports.updateContact = catchAsync(async (req, res) => {
  // const { id } = req.params;

  // update contact data
  // get all contacts from db
  // overwrite contact with new data

  // const contact = await Contact.findById(id);

  const updatedContact = await contactService.updateContact(req.params.id, req.body);
  // Object.keys(req.body).forEach((key) => {
  //   contact[key] = req.body[key];
  // });

  // const updatedContact = await contact.save();

  res.status(200).json({
    msg: 'Success',
    contact: updatedContact,
  });
});

// Delete contact controller
exports.deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await contactService.deleteContactById(id);
  // get all contacts from db
  // delete contact by id

  res.sendStatus(204);
  // res.status(200).json({
  //   msg: 'Success',
  // });
});