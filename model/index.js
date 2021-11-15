const fs = require('fs').promises;
const { join } = require('path');

const contactsPath = join(__dirname, 'contacts.json');

async function deserialize(path) {
  return JSON.parse(await fs.readFile(path));
}

async function serialize(path, data) {
  await fs.writeFile(path, JSON.stringify(data));
}

function randomId(usedId) {
  if (usedId.length > 99) return -1;

  let random;

  do {
    random = Number.parseInt(Math.random() * 100);
  } while (usedId.includes(random));

  return random;
}

async function listContacts() {
  return await deserialize(contactsPath);
}

async function getContactById(contactId) {
  return (await deserialize(contactsPath)).find(e => e.id === contactId);
}

async function removeContact(contactId) {
  const data = await deserialize(contactsPath);

  await serialize(
    contactsPath,
    data.filter(e => e.id !== contactId),
  );
}

async function addContact(name, email, phone) {
  const data = await deserialize(contactsPath);

  const id = randomId(data.map(e => e.id));

  if (id === -1) return Promise.reject('full id pull');

  data.push({ id, name, email, phone });

  await serialize(contactsPath, data);

  return id;
}

const updateContact = async (contactId, name, email, phone) => {
  const data = await deserialize(contactsPath);

  const obj = data.find(e => e.id === contactId);

  if (!obj) return Promise.reject('not found');

  obj.name = name;
  obj.email = email;
  obj.phone = phone;

  await serialize(contactsPath, data);

  return contactId;
};

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };
