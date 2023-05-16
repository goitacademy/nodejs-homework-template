<<<<<<< HEAD
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const contacts = require("./contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((object) => object.id === contactId);
  return contact;
};

const addContact = async (body) => {
  contacts.push({ ...body, id: uuidv4() });
  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);
  return body;
};

const removeContact = async (contactId) => {
  const isContactFound = contacts.findIndex(
    (object) => object.id === contactId
  );
  contacts.splice(isContactFound, 1);
  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);
  return isContactFound;
};

const updateContact = async (contactId, body) => {
  const contactToUpdate = contacts.find((object) => object.id === contactId);
  for (const key in body) {
    contactToUpdate[key] = body[key];
  }
  await removeContact(contactId);
  contacts.push(contactToUpdate);

  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);

  return contactToUpdate;
=======
const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const response = await fs.readFile(contactsPath);
	const data = JSON.parse(response);
	return data;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
	const response = contacts.find(contact => contact.id === contactId);
    return response || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [response] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return response;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}
addContact('Dima', 'dimon_zd@i.ua', '0638036740');
async function updateContact  (contactId, data)  {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId.toString());

  if (index === -1) return null;
  contacts[index] = { id: contactId, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
