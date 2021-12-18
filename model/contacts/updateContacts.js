const fs = require('fs').promises;
const contactsPath = require("./contactsPath");

async function updateContacts(contacts) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        
    } catch (err) {
        console.error(err)
    } 
}

module.exports = updateContacts;