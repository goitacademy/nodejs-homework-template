import contacts from '../../db/contacts.json'

const getContactById = async (contactId) => {
    const foundContact = contacts.find(el => el.id === contactId)
    return foundContact
}

export default getContactById
