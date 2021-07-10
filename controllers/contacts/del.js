const fs = require('fs').promises
const path = require('path')
const contacts = path.basename("D:/nodejs-homework-rest-api/contacts.json")

const del = async (req, res) => {
	const { contactId } = req.params
	const file = await fs.readFile(contacts, 'utf8')
	const newArray = await JSON.parse(file)
	const index = await newArray.findIndex(contact => Number(contactId) === contact.id)
	if (index === -1) {
		res.status(404).json({
			status: 'error',
			code: 404,
			message: 'not found'
		})
		
	}
	const newContacts = await newArray.filter(contact => Number(contactId) !== contact.id)
	await fs.writeFile(contacts, JSON.stringify(newContacts), 'utf-8', error => {
		if (error) {
		console.log(error);
		}
	})
	res.json({
		status: 'success', code: 200, message: 'contact deleted succesfully' })
}

module.exports = del
