const listContacts = require("./listContacts")

async function getContactById(contactId) {
const contacts = await listContacts()
const contact = contacts.find(item => item.id === contactId)
if (!contact) {
return null
}
return contact
}

module.exports = getContactById