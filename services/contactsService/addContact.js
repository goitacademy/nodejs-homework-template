const { Contact } = require("../../models/contacts");

async function addContact(userData) {
    const { name, email, phone, favorite } = userData;
    return await Contact.create({ name, email, phone, favorite });
}

module.exports = {addContact}