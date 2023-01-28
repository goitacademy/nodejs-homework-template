const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");

async function patch(contactId, { name, email, phone }) {
    const strContactId = String(contactId);
    const contacts = await get();

    const index = contacts.findIndex((contact) => contact.id === strContactId);
    if (index === -1) {
        return null;
    }

    const { id, name: oldName, email: oldEmail, phone: oldPhone } = contacts[index];

    contacts[index] = {
        id,
        name: name ?? oldName,
        email: email ?? oldEmail,
        phone: phone ?? oldPhone,
    };

    await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = patch;
