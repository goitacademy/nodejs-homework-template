const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");



async function listContacts() {
   const data = await fs.readFile(contactsPath)
   const contacts = JSON.parse(data);
        return contacts;
  }
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact || null
  }

  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const indexOfContacts = contacts.findIndex((item) => (item.id) === contactId);
  if (indexOfContacts === -1) {
    return null;
  }
  const newContacts = contacts.filter((item) => (item.id) !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[indexOfContacts];
  }
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
  }

  async function updateById(contactId, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id === contactId)

    if (index === -1) {
      return null
    }
    contacts[index] = {contactId, ...data}
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
}; 