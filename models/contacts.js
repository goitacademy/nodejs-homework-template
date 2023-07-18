const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const {
  findContactById,
  userDataValidator,
  userEditDataValidator,
} = require('../utils');

const contactsPath = path.join('models', 'contacts.json');

const listContacts = async (_, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));

    res.status(200).json(contacts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const findedContact = await findContactById(contactId, contactsPath);

    if (!findedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(findedContact);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await findContactById(contactId, contactsPath);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    const contacts = JSON.parse(await fs.readFile(contactsPath));

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};

const addContact = async (req, res) => {
  try {
    const { error, value } = userDataValidator.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const { name, email, phone } = value;

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contacts = JSON.parse(await fs.readFile(contactsPath));
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    res.status(201).json(newContact);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await findContactById(contactId, contactsPath);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error, value } = userEditDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const { name, email, phone } = value;

    if (name) {
      contact.name = name;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }

    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    filteredContacts.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

    res.status(200).json(contact);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
