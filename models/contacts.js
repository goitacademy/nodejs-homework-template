const fs = require('fs/promises')

const path = require('path');
const contactsFilePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8'); 
    const contacts = JSON.parse(contactsData); 
    return contacts; 
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

const addContact = async (body) => {

    let contacts = [];
    const fileContent = await fs.readFile(contactsFilePath, 'utf-8');
    contacts = JSON.parse(fileContent);
    contacts.push(body);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    console.log(body);

};

const removeContact = async (contactId) => {
  try {
    let contacts = [];
    const fileContent = await fs.readFile(contactsFilePath, 'utf-8');
    contacts = JSON.parse(fileContent);

    const initialLength = contacts.length;
    contacts = contacts.filter((c) => c.id !== contactId);

    if (contacts.length !== initialLength) {
      await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
      console.log(`Contact with ID ${contactId} has been deleted`);
      return true;
    } else {
      console.log(`Contact with ID ${contactId} not found`);
      return false;
    }
  } catch (error) {
    throw error;
  }
};


const updateContact = async (contactId, updatedData) => {
  let contacts = [];
  const fileContent = await fs.readFile(contactsFilePath, 'utf-8');
  contacts = JSON.parse(fileContent);

  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
      throw new Error('Contact not found');
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...updatedData };

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
