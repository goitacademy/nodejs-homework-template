const {getAllContacts} = require('./methods')

const getContactById = async (contactId) => {
    const allContacts = await getAllContacts()
    const contact = allContacts.find(item => item.id === Number(contactId))
    return contact
}


module.exports = getContactById