const getContactsList = require("./getContactsList");

const getContactById = async (contactId) => {
	const contacts = await getContactsList();
	const contact = contacts.find((el) => el.id === contactId);

	if (!contact) return null;
	return contact;
};

module.exports = getContactById;
