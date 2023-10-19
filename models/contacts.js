const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  
    const contacts = await fs.readFile(contactsPath);
    const result = JSON.parse(contacts);
    return result;
  
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id == contactId);
    if (!result) {
      return null;
    }
    return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id == contactId);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
      contacts[contactIndex].name = body.name;
      contacts[contactIndex].email = body.email;
      contacts[contactIndex].phone = body.phone;

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[contactIndex];
    } else {
      return null;
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}