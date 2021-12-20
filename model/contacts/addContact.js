const shortid = require("shortid");

const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");

const addContact = async (name, email, phone) => {
    try {
        const newContact = {
            id: shortid.generate(),
            name,
            email,
            phone
        };
        const contacts = await getContactsList();
        contacts.push(newContact);
        await updateContactsList(contacts);
        console.table(contacts);
        return newContact;
    } catch (error) {
        console.log(error);
    }
};

module.exports = addContact;