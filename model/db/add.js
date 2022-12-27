const getAll = require("./getAll");
const { nanoid } = require("nanoid")

const updateContacts = require("./updateContacts")

const add = async ({ name, email, phone }) => {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact)
    await updateContacts(contacts);

    return newContact;
};

module.exports = add;