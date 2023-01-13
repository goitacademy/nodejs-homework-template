const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter(item => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parcedContacts = JSON.parse(contacts);
    const newContact = {
      id: (parcedContacts.length + 1).toString(),
      name,
      email,
      phone,
    };
    const addContact = [...parcedContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(addContact), 'utf-8');
    return getContactById(newContact.id);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parcedContacts = JSON.parse(contacts);
    const leftContacts = parcedContacts.filter(
      contact => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(leftContacts), 'utf-8');
    listContacts();
    // console.table(parcedContacts);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  const parcedContacts = JSON.parse(contacts);

  parcedContacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
