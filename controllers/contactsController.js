const fs = require('fs/promises');
const path = require('path');
const contactSchema = require('../models/contactModel');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts();

    res
      .status(200)
      .json({ status: 'success', results: contacts.length, data: contacts });
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const contacts = await getContacts();

    const contact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );

    if (!contact)
      res.status(404).json({ status: 'fail', message: 'Not found' });

    res.status(200).json({ status: 'success', data: contact });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const removeContact = async (req, res) => {
  try {
    // 1. Get contacts
    const contacts = await getContacts();
    // 2. Check if contact exist
    const contact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );

    if (!contact)
      res.status(404).json({ status: 'fail', message: 'Not found' });
    // 3. Remove contact from list
    const newContacts = contacts.filter(
      (contact) => contact.id !== req.params.contactId
    );
    // 4. Save new list to the file
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf-8'
    );

    res.status(200).json({ status: 'success', message: 'Contact deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const addContact = async (req, res) => {
  try {
    // 1. Validate input
    const validatedContact = await contactSchema.validateAsync(req.body);

    // 2. Check for the same email contact
    const contacts = await getContacts();

    const contactExists = contacts.some(
      (contact) =>
        contact.email.toLowerCase() === validatedContact.email.toLowerCase()
    );

    if (contactExists)
      res.status(400).json({
        status: 'fail',
        message: 'Contact with the same email exists!',
      });

    // 3. Add contact
    const newContact = { id: nanoid(), ...validatedContact };

    const newContacts = [...contacts, newContact];

    // 4. Save new list to the file
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf-8');

    res.status(201).json({ status: 'success', data: newContact });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    // 1. Validate input
    const validatedContact = await contactSchema.validateAsync(req.body);

    // 2. Check if contact exists
    const contacts = await getContacts();

    const updatedContactId = req.params.contactId;
    const updatedContactIndex = contacts.findIndex(
      (contact) => contact.id === updatedContactId
    );

    if (updatedContactIndex === -1) {
      return res.status(404).json({ status: 'fail', message: 'Not found' });
    }

    // 3. Update contact
    const updatedContact = {
      ...contacts[updatedContactIndex],
      ...validatedContact,
    };

    // 4. Update contacts list
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContactId ? updatedContact : contact
    );

    // 5. Save new list to the file
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      'utf-8'
    );

    res.status(200).json({ status: 'success', data: updatedContact });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
