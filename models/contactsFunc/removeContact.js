const listContacts = require("./listContacts")
const updateContacts = require("./updateContacts")

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (!~idx) {
        return null
    }

    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts)

    return contacts[idx]
}

module.exports = removeContact