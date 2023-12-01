const fs = require('node:fs/promises');
const path = require("node:path");
const crypto = require("node:crypto");


const contactsPath = path.join("models", "contacts.json");


const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  }
  catch(error){
    console.error(error.message);
  }
};


const writeContacts = async (contacts) => {
  try{
    fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  }
  catch(error){
    console.error(error.message);
  }
};


const getContactById = async (id) => {
  try{
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    return contact || null;
  }
  catch(error){
    console.error(error.message);
  }
};


const removeContact = async (id) => {
  try{
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if(index === -1){
      return null;
    }

    const result = [
      ...contacts.slice(0, index),
      ...contacts.slice(index + 1),
    ]

    await writeContacts(result);
    return contacts[index];
  }
  catch(error){
    console.error(error.message);
  }
};


const addContact = async ({name, email, phone}) => {
  try{
    const contacts = await listContacts();
    const newContact = {id: crypto.randomUUID(), name, email, phone}
    contacts.push(newContact);

    await writeContacts(contacts);
    return newContact;
  }
  catch(error){
    console.error(error.message);
  }
};


const updateContact = async (id, contact) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
        return undefined;
    }

    const newContact = {id, ...contact};
    const newContacts = [
        ...contacts.slice(0, index),
        newContact,
        ...contacts.slice(index + 1),
    ];

    await writeContacts(newContacts);
    return newContact;
  }
  catch(error) {
    console.error(error.message);
  }
};



module.exports = {
  listContacts, 
  getContactById, 
  removeContact, 
  addContact, 
  updateContact,
};
