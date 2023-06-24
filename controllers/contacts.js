// const fs = require('fs/promises');
// const uuid = require('uuid').v4;
// const { createContactValidator, updateContactValidator } = require('../utils/contactValidator');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/contactModel');

// GET contacts list
const listContacts = catchAsync(async (req, res) => {
console.log(req.user)
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  
  const findOptions = favorite ? { owner, favorite } : { owner };
  console.log(findOptions)
  
  const contactQuery = Contact.find(findOptions)
  
  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  contactQuery.skip(skip).limit(paginationLimit);

  const contacts = await contactQuery;
  const total = await Contact.count(findOptions);
     res.status(200).json({
       contacts,
       total
    })  
})

// GET contact By ID
const getContactById = async (req, res) => {
  const { contact } = req;
  res.status(200).json({
      contact,
    });
  
}

// DELETE contact
const removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
})

// POST new contact
const addContact = catchAsync(async (req, res, next) => {

  const newContactData = {
    owner: req.user,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }

  const newContact = await Contact.create(newContactData);
  
  res.status(201).json({        
    contact: newContact,    
    })    
  }
  )

//  PATCH contact by ID
const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  },
    {new: true}
  );

  res.status(200).json({
    contact: updatedContact
  })
}
)

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
