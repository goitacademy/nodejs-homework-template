const { Contact } = require("../db/schema");

const changeContactById = async (req, res) => {
	const { contactId } = req.params;
	const { name, email, phone, favorite } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing fields" });
	} else {
		const renewContact = await Contact.findByIdAndUpdate(contactId, {
			$set: { name, email, phone, favorite },
		});
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
