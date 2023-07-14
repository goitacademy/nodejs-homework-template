// const fs = require('')
import fs from 'fs/promises'
import path from 'path'

const contactsPath = path.resolve("models", "contacts.json")


export const listContacts = async () => {
	const data = await fs.readFile(contactsPath)
	return JSON.parse(data);
}

export const getContactById = async (contactId) => {
	const data = await listContacts()
	const contact = data.find(item => item.id === contactId)
	return contact || null;
}

export const removeContact = async (contactId) => {
	const contacts = await listContacts()
	const index = contacts.findIndex(contact => contact.id === contactId)
	if (index === -1) {
		return null
	}
	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
	return result
}

export const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts()
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone
	}
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
	return newContact;
}

export const updateContact = async (contactId, body) => {
	const { name, email, phone } = body;
	const contacts = await listContacts()
	const index = contacts.findIndex(contact => contact.id === contactId)
	if (index === -1) {
		return null
	}

	const newName = name ? name : contacts[index].name
	const newEmail = email ? email : contacts[index].email
	const newPhone = phone ? phone : contacts[index].phone

	console.log(contacts[index]);
	contacts[index] = {
		id: contactId,
		name: newName,
		email: newEmail,
		phone: newPhone
	}
	console.log(contacts[index]);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
	return contacts[index]
}
