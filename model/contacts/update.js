
const updateContacts = require("./updateContacts");
const getAllContacts =  require("./getAllContacts");

const update = async (id, body) => {
    try {
        const contacts = await getAllContacts();
        const idx = contacts.findIndex(item => item.id == id);
        if (idx === -1) {
            return null;
        }
        contacts[idx] = { ...contacts[idx], ...body };
        await updateContacts(contacts);
        return contacts[idx];
    }
    catch (error) {
        throw error;
    }
};

module.exports = update;