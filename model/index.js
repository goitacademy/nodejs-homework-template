const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');



const contactsPath = path.join(__dirname, 'contacts.json');

const readData = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const res = JSON.parse(data);
  return res;
};

const writeData = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
};

const listContacts = async () => {
  return readData()
};

const getContactById = async (contactId) => {

  const users = await readData();
  const result = users.find((el) => el.id === contactId);
  return result || null

}

const removeContact = async (contactId) => {
  const users = await readData();
  const index = users.findIndex((el) => el.id === contactId);
  if (index === -1) { return null };
  const user = users.splice(index, 1);
  await writeData(users);
  return user
}

const addContact = async (body) => {

  body.id = crypto.randomUUID()
  const data = await readData();
  data.push(body);
  await writeData(data);
  return body
}

const updateContact = async (contactId, body) => {
  const users = await readData();
  console.log(body);
  const index = users.findIndex((contact) => contact.id === contactId);
  if (index === -1) { return null };
  const updatedUser = { ...users[index], ...body };
  users[index] = updatedUser;
  await writeData(users);
  return updatedUser
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
