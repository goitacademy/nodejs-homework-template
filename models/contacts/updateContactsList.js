const fs = require("fs/promises");
const filePath = require("./filePath");

const updateContactsList = async (newContacts) => {
	await fs.writeFile(filePath, JSON.stringify(newContacts));
};

module.exports = updateContactsList;
