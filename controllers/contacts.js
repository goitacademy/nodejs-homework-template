const fs = require('fs/promises');
const uuid = require('uuid').v4;
const { createContactValidator, updateContactValidator } = require('../utils/contactValidator');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/contactModel');


const contactsDB = './controllers/contacts.json';

// GET contacts list
const listContacts = async (req, res) => {
  const contacts = await Contact.find().select('-__v');
     res.status(200).json({
      contacts,
    })  
}

// GET contact By ID
const getContactById = async (req, res) => {
  res.status(200).json({
      contact,
    });
  
}

// DELETE contact
const removeContact = async (req, res) => {
  const { contact } = req;
  let contacts = JSON.parse(
    await fs.readFile(contactsDB)
  )
  const newcontacts = contacts.filter(item => item.id !== contact.id);
  contacts = [...newcontacts];
  await fs.writeFile(contactsDB, JSON.stringify(contacts, null, 2))
  return res.status(200).json({
    message: 'Contact deleted',
    status: 'success',
    contacts,
  });
}

// POST new contact
const addContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create({ ...req.body });
  
  res.status(201).json({        
    contact: newContact,    
    })    
  }
  )

//  PUT contact by ID
const updateContact = async (req, res) => {
  try {
    const { error, value } = updateContactValidator(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Invalid data...'
      })
    }
    const { contact } = req;
    const contacts = JSON.parse(
      await fs.readFile(contactsDB)
    );
    const updatedContacts = contacts.map(item => {
      if (item.id === contact.id) {
        return { ...item, ...value };
      }
      return item;
    });
    await fs.writeFile(contactsDB, JSON.stringify(updatedContacts, null, 2));
    const updatedContact = updatedContacts.find(item => item.id === contact.id);
    res.status(200).json({
      updatedContact,
    })
  } catch (err) {
    res.status(404).json({
      message: 'Not found'
    })
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
