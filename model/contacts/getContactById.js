const getContactsList = require("./getContactsList");

const getContactById = async (contactId) => {
    try {
        const contacts = await getContactsList();
        const result = contacts.find((item) => item.id === contactId);
        if (!result) {
            return null;
        }
        console.table(result);
        return result;
    } catch (error) {
        console.log(error);

    }
}

module.exports = getContactById;

