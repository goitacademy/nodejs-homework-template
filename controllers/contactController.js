const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

const { catchAsync } = require('../utils') 
const pathToContacts = path.resolve('models/contacts.json');

/**
 * Get contacts list.
 */
exports.listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  res.status(200).json(
    contacts
  );
});

/**
 * Create contact.
 */
exports.addContact = catchAsync(async (req, res) => {
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

    res.status(201).json(
        newContact
    );
});

/**
 * Get contact by id.
 */
exports.getById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  console.log(contacts)
  const contact = contacts.find((c) => c.id === id);

  res.status(200).json(
    contact
  );
});

/**
 * Update contact by id.
 */
exports.updateContact = catchAsync(async (req, res) => {
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

  res.status(200).json(
    contact
  );
});

/**
 * Delete contact by id.
 */
exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contacts = JSON.parse(await fs.readFile(pathToContacts));

  const updatedContactsList = contacts.filter((c) => c.id !== id);

  await fs.writeFile(pathToContacts, JSON.stringify(updatedContactsList));

  res.status(200).json({
    "message": "contact deleted"
  });
});
