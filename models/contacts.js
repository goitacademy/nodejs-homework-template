const fs = require('fs/promises');
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
    const contactsData = JSON.parse(data);
    return contactsData;
}

const getById = async (id) => {
  const contactsData = await listContacts();
    const contact = contactsData.find((item) => item.id === id.toString());
    if (!contact) {
        return null;
    }
    return contact;
}



const removeContact = async (contactId) => {
  const contactsData = await listContacts();
    const idx = contactsData.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contactsData.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsData));
    return removeContact;
}

  const addContact = async (body) => {
  const contactsData = await listContacts();
    const newContact = { id: randomUUID(), ...body };
    contactsData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsData));
    return newContact;
}

const updateContact = async (id, body) => {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contactsData[idx] = { id: id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return contactsData[idx];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
