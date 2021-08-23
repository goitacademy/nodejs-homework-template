const listContacts = require("./listContacts")

const getContactById = async contactId => {
    const contactsList = await listContacts()
    const contact = await contactsList.find(contact => contact.id === +contactId)
    if (!contact) {
        return null
    }
    return contact
}

module.exports = getContactById