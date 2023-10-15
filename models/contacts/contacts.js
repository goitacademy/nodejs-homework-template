import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('models', 'contacts', 'contacts.json')
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
	const data = await fs.readFile(contactsPath, 'utf-8')
	return JSON.parse(data)
}
const getContactById = async id => {
	const contacts = await listContacts()
	const getContact = contacts.find(item => item.id === id)
	return getContact || null
}
 const removeContact = async id => {
	const contacts = await listContacts()
	const index = contacts.findIndex(item => item.id === id)
	if (index === -1) {
		return null
	}
	const [result] = contacts.splice(index, 1)
	await updateContacts(contacts)
	return result
}

 const addContact = async data => {
	const contacts = await listContacts()
	const newContact = {
		id: nanoid(),
		...data,
	}
	contacts.push(newContact)
	await updateContacts(contacts)
	return newContact
}

 const updateContact = async (id, data) => {
	const contacts = await listContacts()
	const index = contacts.findIndex(item => item.id === id)
	if (index === -1) {
		return null
	}
	contacts[index] = { id, ...data }
	await updateContacts(contacts)
	return contacts[index]
}

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
}
