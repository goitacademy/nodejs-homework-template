const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");


const removeContact = async (id) => {
    try {
        const contacts = await getContactsList();

        const idx = contacts.findIndex((item) => item.id === id);
        if (idx === -1) {
            null;
        }

        const newContacts = contacts.filter((_, index) => index !== idx);
        await updateContactsList(newContacts);

        console.table(newContacts);
        return contacts[idx];
    } catch (error) {
        console.log(error);
    }

}

module.exports = removeContact;