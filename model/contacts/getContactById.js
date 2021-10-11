const getAllContacts =  require("./getAllContacts");

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const selectContacts = contacts.find(item => item.id == contactId);
        if (!selectContacts) {
            return null;
        }
        return selectContacts;
    }
    catch (error) {
        throw error;
    }
};

module.exports = getContactById;