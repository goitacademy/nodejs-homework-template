const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId)

    if (!result) {
        console.log("oops")
        return null
    }
    return result
}

module.exports = getContactById