const pathToFile = require("./pathToFile");
const fs = require("fs/promises");

const updateContacts = async (contacts) => {
    await fs.writeFile(pathToFile, JSON.stringify(contacts));
}
module.exports = updateContacts;