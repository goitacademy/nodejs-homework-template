const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateById = async(id, data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const updateContacts = {...contacts[idx], ...data};
    contacts[idx] = updateContacts;
    await updateContacts(contacts);
    return updateContacts;
};

module.exports = updateById;