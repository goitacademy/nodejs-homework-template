const fs = require('fs/promises');
const path = require('path')

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw new Error("Failed to read contacts.json file");
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const result = contacts.find(({ id }) => id === contactId);
    return result || null;
  } catch (error) {
    console.error('Error occurred while getting contact by id', error);
    return null;
  }
};

const removeContact = async (id) => {
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);
const index = contacts.findIndex(({ id: contactId }) => contactId === id);
if (index === -1) {
  return null;
}
const [result] = contacts.splice(index,1);
try {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
} catch (error) {
  throw new Error('Failed to write to contacts.json file');
}
return result
};

const addContact = async ({name,email,phone}) => {
const newContact = {id: Date.now(), name,email,phone}
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);
const addedContact = [...contacts,newContact];
try {
  await fs.writeFile(contactsPath,JSON.stringify(addedContact, null, 2))
} catch (error) {
  throw new Error('Failed to write to contacts.json file');
}
return newContact;
};

const updateContact = async (contactId, body) => {
 const data = await fs.readFile(contactsPath);
 const contacts = JSON.parse(data);
 const index = contacts.findIndex(({id}) => contactId === id )
 if(index === -1){
return null;
}
const updatedContact = {...contacts[index],...body,contactId};
const updatedContacts = [...contacts.slice(0, index),updatedContact, ...contacts.slice(index + 1)];
try {
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
} catch (error) {
  throw new Error('Failed to write to contacts.json file');
}
return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
