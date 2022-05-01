const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const filePath = path.join(__dirname, './db/contacts.json')

const listContacts = async () => {
	const data = await fs.readFile(filePath)
	const list = JSON.parse(data)
	return list
}

const getContactById = async (contactId) => {
	const list = await listContacts()
	const result = list.find((item) => parseInt(item.id) === contactId)
	if (!result) {
		return null
	}
	return result
}

const removeContact = async (contactId) => {
	const list = await listContacts()
	const index = list.findIndex((item) => parseInt(item.id) === contactId)
	if (index === -1) {
		return null
	}
	const [removeContact] = list.splice(index, 1)
	await fs.writeFile(filePath, JSON.stringify(list))
	return removeContact
}

const addContact = async ({ name, email, phone }) => {
	const list = await listContacts()
	const newContact = { name, email, phone, id: v4() }
	list.push(newContact)
	await fs.writeFile(filePath, JSON.stringify(list))
	return newContact
}

const updateContact = async (contactId, { name, email, phone }) => {
	const list = await listContacts()
	let updContact = null
	list.forEach((item) => {
		if (item.id === contactId) {
			item.name = name
			item.email = email
			item.phone = phone
			updContact = item
		}
	})
	await fs.writeFile(filePath, JSON.stringify(list))
	return updContact
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
}
