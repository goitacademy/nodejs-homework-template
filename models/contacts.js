const fs = require("fs/promises");
const path = require("path");
const uuid = require('uuid').v4;

const contactsPath = path.resolve(__dirname, "contacts.json");


const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { createUserDataValidator } = require('../utils/contactValidators');


const listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
 
  res.status(200).json(contacts);
});


const getContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const contact = contacts.find((item) => item.id === contactId) || null;

  if (!contact) {
    res.status(404).json({"message": "Not found"});
  }
 
  res.status(200).json(contact);
});


const removeContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  
  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const handleId = contacts.some((item) => item.id === contactId);

  if (!handleId) {
    res.status(404).json({"message": "Not found"});
  }

  const newContacts = contacts.filter((item) => item.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  res.status(200).json({"message": "contact deleted"});
});


const addContact = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);

  if (error) return next(new AppError(400, {"message": "missing required name field"}));

  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const newContact = {    
    id: uuid(),
    ...value,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  res.status(201).json(newContact);
});


const updateContact = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  const { contactId } = req.params;

  if (error) return next(new AppError(400, {"message": "missing fields"}));

  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    res.status(404).json({"message": "Not found"});
  }

  contacts[index] = {
    id: contactId,
    ...value
  }
    
  await fs.writeFile(contactsPath, JSON.stringify(contacts));  

  res.status(200).json(contacts[index]);

});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}