// const contacts = require('../../contacts.json')

const { Contact } = require('../../model')

const getById = async (req, res) => {
	const { contactId } = req.params
	// // console.log(contactId);
	// const selectedContact = contacts.find(contact => contact.id === Number(contactId))
	// console.log(selectedContact);
	// if (!selectedContact) {
	// 	res.status(404).json({
	// 		status: "error",
	// 		code: 404,
	// 		message: "Contact with pointed ID not found..."
	// 	})
	// }
	// res.json({
	// 	status: 'success', code: 200, data: {
	// 	result: selectedContact,
	// } })
	
	try { const result = await Contact.findById(contactId)
		res.json({
			status: 'success',
			code: 200,
			data: {
		result: result,
			}
		})
	} catch (error) {
		res.status(404).json({error: error.message})
	}	
	
}

module.exports = getById