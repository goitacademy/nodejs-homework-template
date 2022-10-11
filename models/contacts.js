const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactsData = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({id}) => id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [result] = contacts.splice(contactIndex, 1);
    await updateContactsData(contacts);
    return result;

}

async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContactsData(contacts);
    return newContact;
}

async function updateContact(contactId, {name, email, phone}) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId)
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  await updateContactsData(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
