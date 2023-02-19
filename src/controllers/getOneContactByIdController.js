const {Contact} = require('../db/schema')

const getOneContactById = async (req, res) => {
	const { contactId } = req.params;
	const getContact = await Contact.findById(contactId);
	if (getContact) {
		res.status(200).json(getContact);
	} else {
		res.status(404).json({ message: "Not found" });
	}
}

module.exports = {
  getOneContactById
}