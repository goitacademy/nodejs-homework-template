const { Contact } = require('../../models')
const { createError } = require('../../helpers')

const updateContact = async (req, res) => {
	const { contactId } = req.params
	const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	})
	if (!contact) {
		throw createError(404, `contact with id=${contactId} not found`)
	}
	res.json({ status: 'success', code: 200, data: { result: contact } })
}

module.exports = updateContact
