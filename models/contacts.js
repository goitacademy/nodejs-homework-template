const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve(__dirname, 'contacts.json');

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

const listContacts = async () => {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await readContacts();
    const searchedContact = contacts.find(contact => contact.id === contactId);
    return searchedContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await readContacts();
    const searchedContact = contacts.filter(
      contact => contact.id !== contactId,
    );
    await writeContacts(searchedContact);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await readContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    let updatedContact;
    contacts.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = body.name || contact.name;
        contact.email = body.email || contact.email;
        contact.phone = body.phone || contact.phone;
        updatedContact = contact;
      }
    });
    writeContacts(contacts);
    return updatedContact;
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
