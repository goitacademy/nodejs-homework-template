const listContacts = require("./listContacts");

async function getById (id) {
    const contacts = await listContacts();
    const contactById = contacts.find(el => el.id === id.toString());
    console.log(contactById);
    if(!contactById) {
        throw new Error(`No contact with id ${id}`);
    }
    return contactById;
};

module.exports = getById;