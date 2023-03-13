const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;
const { catchAsync, AppError } = require('../utils');

const contactsPath = path.join('models', 'contacts.json');

//get the list of all contacts
const listContacts = catchAsync (async (req, res) => {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    res.status(200).json({
      contacts,
    });
});

//get contact by id
const getContactById = catchAsync (async (req, res) => {
    const { contact } = req;
    res.status(200).json({
      contact,
    });
});

//create new contact
const addContact = catchAsync (async (req, res) => {
    const { name, email, phone } = req.body;
    const dataFromDB = await fs.readFile(contactsPath);
    const contacts = JSON.parse(dataFromDB);
    const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

    res.status(201).json({
      contact: newContact,
    });
});

//delete contact
const removeContact = catchAsync (async (req, res) => {
    const { id } = req.params;
    const dataFromDB = await fs.readFile(contactsPath);
    const contacts = JSON.parse(dataFromDB);
    const updatedContactsList = contacts.filter((item) => item.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
    res.status(200).json({"message": "contact deleted"});
});

//Edit contact's data
const updateContact = catchAsync (async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const dataFromDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(dataFromDB);
  const contact = contacts.find((item) => item.id === id);

  if (name) contact.name = name;
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const contactIdx = contacts.findIndex((item) => item.id === id);
  contacts[contactIdx] = contact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  res.status(200).json({
    contact,
  });
});


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
