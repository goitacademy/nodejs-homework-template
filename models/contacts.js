const fs = require("fs/promises");
const path = require("path");

const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateData = async (data) => {
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
	const res = await fs.readFile(contactsPath);
	return JSON.parse(res);
};

const getContactById = async (id) => {
	const contacts = await listContacts();
	const res = await contacts.find(
		(contact) => JSON.stringify(contact.id) === JSON.stringify(id)
	);
	if (!res) {
		return null;
	}
	return res;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: ObjectID(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateData(contacts);
	return newContact;
};

const updateContact = async (id, body) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(
		(e) => JSON.stringify(e.id) === JSON.stringify(id)
	);
	if (idx === -1) {
		return null;
	}
	contacts[idx] = { ...body, id };
	await updateData(contacts);
	return contacts[idx];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (e) => JSON.stringify(e.id) === JSON.stringify(id)
  );
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateData(contacts);
  return result;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
