const fs = require('fs').promises
const path = require('path')
const contactsPath = path.basename("D:/nodejs-homework-rest-api/contacts.json")

const patch = async (req, res) => {
	const { contactId } = req.params
	const file = await fs.readFile(contactsPath, 'utf8')
	const contacts = await JSON.parse(file)
	const index = await contacts.findIndex(contact => Number(contactId) === contact.id)
	if (index === -1) {
		res.status(404).json({
			status: 'error',
			code: 404,
			message: 'not found'
		})
		
	}
	const currentContact = contacts[index]
	contacts[index] = { ...currentContact, ...req.body, id: contactId }
	await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8', error => {
		if (error) {
		console.log(error);
		}
	})
	// console.log(contacts);
	// console.log(contacts);
	// contacts.push(updatedContact)
	// console.log(contacts.push(updatedContact));

	res.json({
		status: 'success', code: 200, data: {
		result: contacts[index],
	} })
	
	
}


module.exports = patch