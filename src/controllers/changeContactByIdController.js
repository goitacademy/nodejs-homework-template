const {updateContact} = require('../models/contacts')

const changeContactById = async (req, res) => {
	const { contactId } = req.params;
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing fields" });
	} else {
		const renewContact = await updateContact (contactId, {$set: {name, email, phone}})
		if (renewContact) {
			res.status(200).json({ message: "Contact Updated" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	}
};

module.exports = {
	changeContactById,
};
