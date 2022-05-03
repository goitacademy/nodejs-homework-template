const { Contact } = require('../../models')
const { createError } = require('../../helpers')

const updateContactStatus = async (req, res) => {
	const { contactId } = req.params
	const { favorite } = req.body
	const contact = await Contact.findByIdAndUpdate(
		contactId,
		{ favorite },
		{ new: true }
	)
	if (!contact) {
		throw createError(404, `contact with id=${contactId} not found`)
	}
	res.json({ status: 'success', code: 200, data: { result: contact } })
}

module.exports = updateContactStatus
