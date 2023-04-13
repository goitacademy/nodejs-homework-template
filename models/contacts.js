const fs = require('fs/promises')
const {v4} =require('uuid')
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');


const listContacts = async () => {
		const data = await fs.readFile(contactsPath)
		const contacts = JSON.parse(data);
		return contacts;
}

const getContactById = async (id) => {
	const contacts = await listContacts();
	const userId = contacts.find(itme => itme.id === id)
	return userId;
}

const removeContact = async (id) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(item => item.id === id.toString());
	if(idx === -1){
		return null;
	}
	const [delUser] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return delUser;

}

const addContact = async (body) => {
	const contacts = await listContacts();
	const updateId = {...body, id: v4()}
	const newContact = [...contacts, updateId];
	await fs.writeFile(contactsPath, JSON.stringify(newContact));
	return newContact;
	

}

const updateContact = async (id, body) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(item => item.id === id);
	if(idx === -1){
		return null;
	}
	contacts[idx] = {...body, id};
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contacts[idx];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
