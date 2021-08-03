// const contacts = require('../../contacts.json')
const {Contact} = require('../../model')


const getAll = async (req, res) => {
	// res.json({
	// 	status: 'success', code: 200, data: {
	// 	result: contacts,
	// } })
	

	try {
		const result = await Contact.find()
	res.status(200).json(result)
	} catch (error) {
		res.status(404).json({error: error.message})
		
	}
}

module.exports = getAll