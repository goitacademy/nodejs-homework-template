const fs = require('fs/promises')
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname,  "contacts.json");

const listContacts = async () => {
   try {
     const data = await fs.readFile(contactsPath, "utf-8");
     const contacts = JSON.parse(data);
     return contacts;
   } catch (error) {
     throw new Error("Error reading contacts data");
   }
}

const getContactById = async (contactId) => {

  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    throw new Error("Error reading contacts id");
  }
}

const removeContact = async (contactId) => {
   try {
     const contacts = await listContacts();
     const index = contacts.findIndex((c) => c.id === contactId);
     if (index !== -1) {
       const removedContact = contacts.splice(index, 1)[0];
       await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
       return removedContact;
     }
     return null;
   } catch (error) {
     throw new Error("Error");
   }
}

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
     ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Error");
  }
};

const updateContact = async (contactId, data) => {
   
     const contacts = await listContacts();
     const index = contacts.findIndex((item) => item.id === contactId);
     if (index === -1) {
       return null;
     }
     contacts[index] = { contactId, ...data };
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
     return contacts[index];
   
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
