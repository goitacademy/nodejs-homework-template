const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const selectContsct = contacts.find(item => String(item.id) === String(contactId));
        if (!selectContsct) {
            return null;
        }
        console.log(selectContsct);
        return selectContsct;
    }
    catch (error) {
        throw error;
    }
};

module.exports = getContactById;