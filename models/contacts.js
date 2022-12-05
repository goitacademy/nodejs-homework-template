const fs = require('fs/promises');
const path = require('path');
const colors = require('colors/safe');

const contactsPath = path.resolve('models/contacts.json');

async function readFile() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
  } catch (err) {
    error(err);
  }
}

async function writeFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
  } catch (err) {
    error(err);
  }
}

function error(message) {
  console.log(colors.red.underline(message));
  process.exit();
}

/**
 * Output of data array in the form of a table to the console.
 * @returns console.table(array)
 */
const listContacts = async (req, res, next) => {
  try {
    const contacts = await readFile();
    console.table(contacts);
    return res
      .status(200)
      .json(contacts);
  } catch (err) {
    next(error(err));
  }
}

/**
 * Search in the data array by 'Id' and output data in the form of a table to the console.
 * @param {string} contactId - id of the element to be found.
 * @returns console.table(array)
 */
const getById = async (req, res, next) => {
  try {
    const contacts = await readFile();
    const { contactId } = req.params;
    const index = await contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: 'Not found' });
    }

    const contact = contacts[index];
    console.table(contact);

    return res
      .status(200)
      .json(contact);
  } catch (err) {
    next(error(err));
  }
}

/**
 * Removing element by 'Id' from data array.
 * @param {string} contactId - id of the element to be deleted.
 */
const removeContact = async (contactId) => {
  const contacts = await readFile();
  const newContactsList = await contacts.filter(({ id }) => id !== contactId);
  writeFile([...newContactsList]);
}

/**
 * Adding a new element to an data array.
 * @param {string} name
 * @param {string} email
 * @param {string} phones
 */
const addContact = async ({ name, email, phone }) => {
  const contacts = await readFile();
  const newContactId = (Number(contacts[contacts.length - 1].id) + 1).toString();
  const newContact = {
    id: newContactId,
    name,
    email,
    phone
  }
  writeFile([...contacts, newContact]);
  return newContact;
}

/**
 * Updating by 'Id' from data array.
 * @param {string} contactId - id of the element to be update.
 * @param {string} name
 * @param {string} email
 * @param {string} phones
 */
const updateContact = async (contactId, { name, email, phone }) => {
  // const contacts = await readFile();
  // const contact = await contacts.filter(({ id }) => id === contactId);
  // contact[0].name = name;
  // contact[0].email = email;
  // contact[0].phone = phone;
  // return contact;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
