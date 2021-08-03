
const {Contact} = require('../../model')

const patch = async (req, res) => {
	const { contactId } = req.params
		
	try {
		const result = await Contact.findOneAndUpdate({_id: contactId}, {...req.body}, {new: true})
		res.status(200).json(result)
	} catch (error) {
		res.status(404).json({error: error.message})
	}	


}


module.exports = patch