const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, "./contacts.json")
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === String(contactId));

  if (!contact) {
    return `\x1B[31m Contact with id ${contactId} not found!`;
  }

  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === String(contactId));
  if (index === -1) {
    return `\x1B[31m Contact with id ${contactId} not found!`;
  }

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

const addContact = async ({name,email,phone}) => {
  if (!name) {
    return "\x1B[31m Name is required!";
  }
  if (!email) {
    return "\x1B[31m E-mail is required!";
  }
  if (!phone) {
    return "\x1B[31m Phone is required!";
  }
  const contacts = await listContacts();

  const newContact = {id: String(Math.floor(Math.random() * 100) + 11), name, email, phone: String(phone)};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, {name,email,phone}) => {
  const contacts = await listContacts();
  let updatedContact = null;
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name
      contact.email = email
      contact.phone = phone
      updatedContact = contact
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
