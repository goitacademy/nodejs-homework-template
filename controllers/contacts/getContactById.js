const { Contact } = require('../../models')
const { createError } = require('../../helpers')

const getContactById = async (req, res) => {
	const { contactId } = req.params
	const result = await Contact.findById(contactId)
	if (!result) {
		throw createError(404, `contact wtj id=${contactId} not found`)
	}
	res.json({ status: 'success', code: 200, data: result })
}

module.exports = getContactById
