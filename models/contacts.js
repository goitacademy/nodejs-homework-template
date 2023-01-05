const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve(__dirname, './contacts.json');
const { v4: uuidv4 } = require('uuid');

async function readDb() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

const writeDb = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  try {
    const data = await readDb();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readDb();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readDb();
    const contactByName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const contactByMail = contacts.find((contact) => contact.email === email);
    const contactByPhone = contacts.find((contact) => contact.phone === phone);

    if (contactByName) throw new Error('This name already exists!');

    if (contactByMail) throw new Error('This email already exists!');

    if (contactByPhone) throw new Error('This phone already exists!');

    const id = uuidv4();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);

    await writeDb(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readDb();

    const idContact = contacts.findIndex((contact) => contact.id === contactId);
    if (idContact === -1) {
      throw new Error(`Contact with id=${contactId} not found!!!`);
    }

    const contactDelete = contacts.splice(idContact, 1);

    writeDb(contacts);
    return contactDelete;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readDb();
    const oldContact = await contacts.find(
      (contact) => contact.id === contactId
    );
    if (oldContact) {
      const updatedContact = { ...oldContact, ...body };
      const index = contacts.indexOf(oldContact);
      contacts.splice(index, 1, updatedContact);
      await writeDb(contacts);
      return updatedContact;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};