// const express = require('express')
// const fs = require('fs/promises');
const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { Types } = require('mongoose');
const { createContactDataValidator } = require('../utils/contactValidator');

// const contactsDB = './controllers/contacts.json';

// const isValidId = async (req, res, next) => {
//     try {
//     const { contactId } = req.params;
//     const contacts = JSON.parse(
//       await fs.readFile(contactsDB)
//     );
//     const contact = contacts.find(contact => contact.id === contactId);
//     if (!contact) {
//       return res.status(404).json({
//         message: 'Contact does not exist...'
//       });
//       }
//       req.contact = contact;
//         next();
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// }

const checkContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) return next(new AppError(400, 'Bad request..'));

  const contact = await Contact.findById(id);

  if (!contact) return next(new AppError(404, 'Contact does not exist..'));

  req.contact = contact;

  next();
});

// module.exports = isValidId;

const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = createContactDataValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid contact data..'));

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists) return next(new AppError(400, 'Contact with this email already exists..'));

  req.body = value;

  next();
});

module.exports = {
  checkContactById,
  checkCreateContactData
}