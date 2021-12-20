const getContactsList = require("./getContactsList");

const getContactById = async (id) => {
    try {
        const contacts = await getContactsList();
        const result = contacts.find((item) => item.id === id);
        if (!result) {
            return null;
        }
        return console.table(result);
    } catch (error) {
        console.log(error);

    }
}

module.exports = getContactById;

