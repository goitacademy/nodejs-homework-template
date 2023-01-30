const get = require("./get");

async function getById(contactId) {
    const strContactId = String(contactId);
    const contacts = await get();
    const contact = contacts.find((contact) => contact.id === strContactId);

    if (!contact) {
        return null;
    }

    return contact;
}

module.exports = getById;
