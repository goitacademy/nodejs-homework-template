const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
const getContactById = async(id) => {
    const contacts = await listContacts();
  
    const result = contacts.find(item => item.id === id);

    return result || null;
}
const add = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const addContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(addContact);
  await updateContacts(contacts);
  return addContact;
}
const updateContact = async(id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }

    contacts[index] = {id, ...data};
    await updateContacts(contacts);

    return contacts[index]
}
const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  add,
  updateContact,
  removeContact,
}