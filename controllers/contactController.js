const fs = require('fs').promises;
const uuid = require('uuid').v4;

const { catchAsync } = require('../utils') 
const pathToContacts = '../models/contacts.json'
console.log('pathToContacts: ', pathToContacts);

/**
 * Create contact.
 */
exports.createContact = catchAsync(async (req, res) => {
    const { name, email, phone } = req.body;

    const dataFromDB = await fs.readFile(pathToContacts);

    const contacts = JSON.parse(dataFromDB);
    const newContact = {
        id: uuid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);

    await fs.writeFile(pathToContacts, JSON.stringify(contacts));

    res.status(201).json({
        contact: newContact,
    });
});

/**
 * Get contacts list.
 */
exports.getContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  res.status(200).json({
    contacts,
  });
});

/**
 * Get contact by id.
 */
exports.getContactById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  const contact = contacts.find((c) => c.id === id);

  res.status(200).json({
    contact,
  });
});

/**
 * Update contact by id.
 */
exports.updateContactById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  const contact = contacts.find((c) => c.id === id);

  if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;

  const userIdx = contacts.findIndex((c) => c.id === id);

  contacts[userIdx] = contact;

  await fs.writeFile(pathToContacts, JSON.stringify(contacts));

  res.status(200).json({
    contact,
  });
});

/**
 * Delete contact by id.
 */
exports.deleteContactById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  const updatedContactsList = contacts.filter((c) => c.id !== id);

  await fs.writeFile(pathToContacts, JSON.stringify(updatedContactsList));

  res.sendStatus(204);
});
