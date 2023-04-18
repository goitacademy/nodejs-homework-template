const fs = require('fs/promises');

const path = require('path');

const {nanoid} = require("nanoid");
const id = nanoid();

const contactsPath = path.join(__dirname, '../contacts/contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return (result);

};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(item => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  const deletedContact = allContacts[contactIndex];
  if(contactIndex !== -1){
    allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return deletedContact || null;
}

const addContact = async (body) => {
    const newContact = {id, body};
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    allContacts[index] = {id, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
