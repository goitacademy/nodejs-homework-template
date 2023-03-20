  const Contact = require('../models/contactModel');

  const { catchAsync, AppError } = require('../utils');

  const addContact = catchAsync(async (req, res, next) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      contact: newContact,
    });
  });

  const listContacts = catchAsync (async (req, res) => {
    const contacts = await Contact.find().select('-__v');
    res.status(200).json({
            contacts,
  });
});

const getContactById = catchAsync (async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
    res.status(200).json({
    contact,
  });
});

const updateContact = catchAsync (async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {new: true});
  res.status(200).json({
      updatedContact,
  });
});

const removeContact = catchAsync (async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({"message": "contact deleted"});
});

const updateStatusContact = catchAsync (async (req, res) => {
  const { id } = req.params;
  const { body } = req.body.favorite;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {new: true});

  res.status(200).json({
    updatedContact,
  });
});

  module.exports = {
    listContacts,
    addContact,
    getContactById,
    updateContact,
    removeContact,
    updateStatusContact,
  };