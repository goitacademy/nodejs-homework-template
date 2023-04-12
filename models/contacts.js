const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(data) {
    try {
        const contacts = await listContacts();
        const newContact = {
            // yarn add nanoid@3.3.4
            id:nanoid(),
            ...data,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
      } catch (error) {
        console.log(error);
      }
}
  
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  console.log('====================================');
  console.log("updateContact id", index);
  console.log('updateContact=====>', contactId);
  contacts[index]={contactId, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
