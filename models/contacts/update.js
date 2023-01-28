const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");

async function update(contactId, { name, email, phone }) {
    const strContactId = String(contactId);
    const contacts = await get();

    const index = contacts.findIndex((contact) => contact.id === strContactId);
    if (index === -1) {
        return null;
    }
    const updateContact = contacts[index];

    contacts[index] = {
        ...updateContact,
        name,
        email,
        phone,
    };
    await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = update;
