const contactsPath = require("./contactsPath");
const fs = require('fs/promises');
const updateContacts = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
};
module.exports = updateContacts;