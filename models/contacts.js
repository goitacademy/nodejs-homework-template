const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");


async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

function updateContacts(contacts) {
   return fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({id}) => contactId === id);
    return contact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { ...contacts, id: nanoid(4), name: name, email: email, phone: phone }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}


async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;

}

async function updateById(contactId, body) {
  const contactStringId = String(contactId);

  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactStringId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = { listContacts, addContact, updateContacts,updateById, removeContact, getContactById };

