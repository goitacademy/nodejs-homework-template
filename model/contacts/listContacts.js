const getContactsList = require("./getContactsList");

const listContacts = async () => {
    try {
        const contactsListArr = await getContactsList();
        return console.table(contactsListArr);;
    } catch (error) {
        console.log(error)
    }
};

module.exports = listContacts;

