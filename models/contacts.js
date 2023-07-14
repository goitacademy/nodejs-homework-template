// const fs = require('fs/promises')
const fs = require("fs/promises")
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (id) => {
    const list = await listContacts()
    const result = list.find(item => item.id === id)
    return result || null
}

const removeContact = async (id) => {
  const list = await listContacts();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) {
        return null
    }
    const [result] = list.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result
}

const addContact = async (data) => {
   const list = await listContacts()
    const newContact = {
        id: nanoid(),
        ...data

    } 
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact
}

const updateContact = async (id, data) => {
  const list = await listContacts();
  const index = list.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  list[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
