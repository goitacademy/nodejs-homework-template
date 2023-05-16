const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);

	if (!result) {
		throw HttpError(404, "Not found contact");
	}
    res.status(200).json ({
      message: "Сontact deleted"
    })
	
};

module.exports = deleteContact;