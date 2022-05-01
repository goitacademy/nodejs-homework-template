const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = require("./listContacts");

async function updateContact ({id, changedContact}) {
    const contacts = await listContacts();
    const contactById = contacts.find(el => el.id === id.toString());
    if(!contactById) {
        throw new Error(`No contact with id ${id}`);
    }
    const indexOfContactToChange = contacts.indexOf(contactById);
    console.log(indexOfContactToChange);
    contacts.splice(indexOfContactToChange, 1, {id: id, ...changedContact});
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return changedContact;
};

module.exports = updateContact;