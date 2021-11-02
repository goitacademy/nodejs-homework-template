const {getAllContacts} = require('./methods')

const getContactById = async (contactId) => {
    const allContacts = await getAllContacts()
    const contact = allContacts.find(item => { 
        if (Number(contactId)) {
            return item.id === Number(contactId)
        }
        return item.id === contactId })
        
        // item.id === Number(contactId))
    return contact
}


module.exports = getContactById