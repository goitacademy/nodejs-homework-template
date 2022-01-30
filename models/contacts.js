const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  console.log(contactId);
  const arr = await listContacts();
  const contact = arr.find((e) => e.id == contactId);
  if (!contact) {
    console.log(`contact by id=${contactId} is non found`);
    return null;
  }
  console.log(contact);
  return contact;
};

const removeContact = async (contactId) => {
  const arr = await listContacts();
  const idRemove = arr.findIndex(item => item.id == contactId);
  if (idRemove === -1) {
    return null
  }
  const deleteContact = arr[idRemove];
  arr.splice(idRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
  return deleteContact;
};

const addContact = async ({name, email, phone}) => {
  const arr = await listContacts();
  const newContacts = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  arr.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(arr));
  return newContacts;
};

const updateContact = async ({contactId, name, email, phone}) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {id:contactId, name, email, phone};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
