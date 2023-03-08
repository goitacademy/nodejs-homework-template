const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

/**
 * Get contacts list
 */
const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
/**
 * Get contact by id
 */
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataFromDB = await fs.readFile('./models/contacts.json', 'utf8');
    // const textJson = dataFromDB.toString();
    const contacts = JSON.parse(dataFromDB);
    const contact = contacts.find((item) => item.id === id);

    res.status(200).json({
      contact,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
/**
 * Delete contact by id.
 */
const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const dataFromDB = await fs.readFile('./models/contacts.json');
    const contacts = JSON.parse(dataFromDB);
    const updateContactsList = contacts.filter((item) => item.id !== id);

    await fs.writeFile('./models/contacts.json', JSON.stringify(updateContactsList));

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
/**
 * Create contact
 */
const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const dataFromDB = await fs.readFile('./models/contacts.json');
    const contacts = JSON.parse(dataFromDB);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));
    res.status(201).json({
      contact: newContact,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
/**
 * Update contact by id.
 */
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));
    const contact = contacts.find((item) => item.id === id);

    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;

    const contactIndex = contacts.findIndex((item) => item.id === id);

    contacts[contactIndex] = contact;

    await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));

    res.status(200).json({
      contact,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
