const contactsList = require('./listContacts');

async function getContactById(contactId) {
    const contacts = await contactsList();
    const result = contacts.find((item) => item.id === String(contactId));
    if(!result){
        return null;
    }
    return result;
}

module.exports = getContactById;