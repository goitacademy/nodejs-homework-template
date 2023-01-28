const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");

async function remove(contactId) {
    const strContactId = String(contactId);
    const contacts = await get();

    const index = contacts.findIndex((contact) => contact.id === strContactId);
    if (index === -1) {
        return null;
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

module.exports = remove;
