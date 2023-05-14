const fs = require('fs/promises');

const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');
const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts=async() => {
  const data =await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const  getContactById= async (id) => {
const contacts = await listContacts();
const result = contacts.find(item => item.id ===id);
return result || null;
}

const removeContact= async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id ===id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

const  addContact= async(data) => {
    const contacts = await listContacts();
    const newContacts ={
        id: nanoid(),
        ...data,
    }

    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
}

const updateById = async(id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
      return null;
  }
  contacts[index] = {id, ...data};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports ={
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
}
