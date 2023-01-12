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
  const contacts = await readContacts();
    return contacts;
};

const getContactById = async contactId => {
  const contacts = await readContacts();
    const searchedContact = contacts.find(contact => contact.id === contactId);
    return searchedContact;
};

const removeContact = async contactId => {
  const contacts = await readContacts();
    const searchedContact = contacts.filter(
      contact => contact.id !== contactId,
    );
    await writeContacts(searchedContact);
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      
    };
    contacts.push(newContact);
    await writeContacts(contacts);
};

const updateContact = async (contactId, body) => {
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
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
