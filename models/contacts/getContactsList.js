const fs = require("fs/promises");
const filePath = require("./filePath");

const getContactsList = async () => {
	const data = await fs.readFile(filePath);
	const contacts = JSON.parse(data);
	return contacts;
};

module.exports = getContactsList;
