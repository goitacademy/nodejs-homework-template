const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");

const updateContact = async ({ id, name, email, phone }) => {
    try {
        const contacts = await getContactsList();
        const idx = contacts.findIndex(item => item.id === id);
        if (idx === -1) {
            return null;
        };
        contacts[idx] = { id, name, email, phone };
        await updateContactsList(contacts);
        return contacts[idx];

    } catch (error) {
        console.log(error);
    }

}

module.exports = updateContact;