const fs = require('fs/promises');
const {nanoid} = ("nanoid");

const filePath = require("./filePath");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if(!result){
      return null;
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return contacts[idx];
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = {...body, id:nanoid()};
  contacts.push(newContacts);
  await updateContacts(contacts);
  return newContacts;
}

const updateContact = async (id,body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  console.log(7);
  if(idx === -1){
      return null;
  }
  contacts[idx] = {...body, id};
  await updateContacts(contacts);
  return contacts[idx];
}


const updateContacts = async(contacts)=> {
  await fs.writeFile(filePath, JSON.stringify(contacts));
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}