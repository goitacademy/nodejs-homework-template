const { v4 } = require("uuid");

const getAllContacts = require("./getAllContacts")
const updateContacts = require("./updateContacts")

const addContact = async (body) => {
    try {
        const newContact = {
            id: v4(),
            name: body.name,
            email: body.email,
            phone: body.phone
        };
        const contacts = await getAllContacts();
        contacts.push(newContact);
        await updateContacts(contacts);
        return newContact;
    }
    catch (error) {
        throw error;
    }
};

module.exports = addContact;       