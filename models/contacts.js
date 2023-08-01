const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require('path');


const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};


const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find(({id}) => id === contactId.toString());
  if (!contactById) {
    return null;
    } else {
    return contactById;
  };
}

const removeContact = async (contactId) => {
  const data = await listContacts();
  const newData = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newData));
  
  const removedContact = data.find((item)=> item.id === contactId)
  return removedContact || null
}

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();

  const body = {
    id: randomUUID(),
    name,
    email,
    phone
  };

  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data))
  return body;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...data[index], ...body };
  data[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(data))
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
