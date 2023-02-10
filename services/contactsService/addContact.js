const { Contact } = require("../../models/contacts");

async function addContact(userData) {
    const { name, email, phone, favorite, owner } = userData;
    return await Contact.create({ name, email, phone, favorite, owner });
}

module.exports = {addContact}