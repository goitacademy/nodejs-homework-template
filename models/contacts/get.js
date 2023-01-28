const fs = require("fs/promises");
const contactDbPath = require("./dbPath");

async function get() {
    const contacts = await fs.readFile(contactDbPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
}

module.exports = get;
