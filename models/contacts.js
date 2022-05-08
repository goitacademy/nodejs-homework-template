const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contactToFind = allContacts.find(el => el.id === contactId);
  if (!contactToFind) {
    console.log(`contact with id ${contactId} haven't been found`);
    return null;
  }
  return contactToFind;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const contactToDelete = allContacts.find(el => {
    return el.id === contactId;
  });
  const actualizedContacts = allContacts.filter(el => {
    return el.id !== contactId;
  });
  await fs.writeFile(contactsPath, JSON.stringify(actualizedContacts));
  return contactToDelete;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const actualizedContacts = [
    ...allContacts,
    {
      id: nanoid(),
      name,
      email,
      phone,
    },
  ];
  await fs.writeFile(contactsPath, JSON.stringify(actualizedContacts));
  return actualizedContacts;
};

const updateContact = async ({ id, changedContact }) => {
  const contacts = await listContacts();
  const contactById = contacts.find(el => el.id === id.toString());
  if (!contactById) {
    throw new Error(`No contact with id ${id}`);
  }
  const indexOfContactToChange = contacts.indexOf(contactById);
  console.log(indexOfContactToChange);
  contacts.splice(indexOfContactToChange, 1, { id: id, ...changedContact });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return changedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
