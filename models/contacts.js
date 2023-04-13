const fs = require('fs/promises')
const {v4} =require('uuid')
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');
console.log('====>', contactsPath);


const listContacts = async () => {
		const data = await fs.readFile(contactsPath)
		const contacts = JSON.parse(data);
		// console.log('DATA ====>',contacts);
		return contacts;
}

const getContactById = async (id) => {
	console.log('ID-2--->',id);
	const contacts = await listContacts();
	console.log("DATA3===>", contacts);
	const userId = contacts.find(itme => itme.id === id)
	console.log('CONTACT-ID====>', id);
	return userId;
}

const removeContact = async (id) => {
	const contacts = await listContacts();
	console.log('GetAll====>', contacts);
	const idx = contacts.findIndex(item => item.id === id.toString());
	console.log("IDX===>", idx);
	if(idx === -1){
		return null;
	}
	const [delUser] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log("remove====>", delUser);
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
	console.log('CONTACT-IDX====>',contacts[idx]);
	return contacts[idx];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
