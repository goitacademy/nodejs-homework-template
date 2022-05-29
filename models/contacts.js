const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === String(id));
  return result;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const oldContacts = contacts.findIndex(
      (item) => item.id === String(contactId)
    );
    if (oldContacts === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(oldContacts, 1);
    await updateContact(contacts);
    return removedContact;
}

const addContact = async (name, email, phone) => {  
const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

const updateContact = async (contacts) => {
  const data = JSON.stringify(contacts, null, 3);
  await fs.writeFile(contactsPath, data);
};

const updateById = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === String(id));
  if (!result) {
    return null;
  }
  result.name = name;
  result.email = email;
  result.phone = phone;
  await updateContact(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateById,
};
