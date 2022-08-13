const fs = require("fs/promises");
const { nanoid } = require("nanoid");
// const { Router } = require ("express");
// const fs = require("fs/promises");
const path = require("path");
// const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "./contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const contactsList = JSON.parse(await fs.readFile(contactsPath));
  return contactsList;
};

const getContactById = async (id) => {
  const contactsList = await listContacts();
  const result = contactsList.find((item) => String(item.id) === id);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (id) => {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const [removeContact] = contactsList.splice(idx, 1);
    await updateContactsList(contactsList);
    return removeContact;
};

const updateContactsList = async (contactsList) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
};

const addContact = async ({ name, email, phone }) => {
  const contactsList = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);
  await updateContactsList(contactsList);
  return newContact;
};

const updateContact = async ( id, {name, email, phone} ) => {
  const contactsList = await listContacts();
    
    const updateData = {
        name,
        email,
        phone,
      };

    const idx = contactsList.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    contactsList[idx] = {id, ...updateData};
    await updateContactsList(contactsList);
    return contactsList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
