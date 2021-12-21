const fs = require('fs/promises');
const path = require('path');
const {randomUUID}=require('crypto')

const contactsPath = path.join(__dirname, 'contacts.json');

const readContacts = async  () => {
  try {
    const response= await fs.readFile(contactsPath,'utf8');
    return JSON.parse(response);
  }
  catch (error) {
    console.log(error)
  }
}
const listContacts = async () => {
  return await readContacts()
}

const getContactById = async (contactId) => {

  try {
    const contacts= await readContacts();
    const findContact= contacts.find(contact => contact.id === contactId);
    return findContact;
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact=contacts.find(contact => contact.id === contactId);
    if(contact) {
      const removeContactById=contacts.filter(contact => contact.id !== contactId);
      await fs.writeFile(contactsPath,JSON.stringify(removeContactById,null,2));
      return contact;
    }
    return null;

  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  const id = randomUUID()
  try {
    const contact = {id,...body};
    const contacts = await readContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2));
    return contact;
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {

  try {
    const contacts = await readContacts();
    const contactIndex=contacts.findIndex(contact => contact.id === contactId);
    if(contactIndex > -1) {
      const updateContact= {id:contactId, ...contacts[contactIndex],...body};
      contacts[contactIndex] = updateContact;
      await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2));
      return updateContact;
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  readContacts
}
