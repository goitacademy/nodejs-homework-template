const { Contact } = require('./addContact')

const addContact = async (req, res) => {
	const result = await Contact.create(req.body)
	res.json({ status: 'success', code: 200, data: result })
}

module.exports = addContact
