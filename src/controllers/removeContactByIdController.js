const {Contact} = require('../db/schema')

const removeContactById = async (req, res) => {
	const { contactId } = req.params;
	if (contactId) {
		await Contact.findByIdAndRemove(contactId);
		res.status(200).json({ message: "contact deleted" });
	} else {
		res.status(400).json({ message: "Not found" });
	}
}

module.exports = {
  removeContactById
}