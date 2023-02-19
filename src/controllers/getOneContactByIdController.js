const {getContactById} = require('../models/contacts')

const getOneContactById = async (req, res) => {
	const { contactId } = req.params;
	const getContact = await getContactById(contactId)
	if (getContact) {
		res.status(200).json(getContact);
	} else {
		res.status(404).json({ message: "Not found" });
	}
}

module.exports = {
  getOneContactById
}