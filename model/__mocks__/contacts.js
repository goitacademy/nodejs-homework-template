const {contacts} = require('./data');

//, 1 - лист контактов:
const listContacts = jest.fn((userId, query) => {
    const {limit = 5, offset = 0} = query
    return {contacts, total: contacts.length, limit, offset}
})


//, 2 -  получить контакт по ID:
const getContactById = jest.fn((userId, contactId) => {
    const [contact] = contacts.filter(el => String(el._id) === String(contactId))
    return contact
})

//, 3- удалить контакт (по ID):
const removeContact = jest.fn((userId, contactId) => {
    const index = contacts.findIndex(el => Srting(el._id) === String(contactId))
    if (index === -1) {
        return null
    }
    const [deletedContact] = contacts.splice(index, 1)
    return deletedContact
})

//, 4 - добавить контакт
const addContact = jest.fn((userId, body) => {
    contacts.push({...body, _id:'609187daacbf42393ded8878'})
    return {...body, _id:'609187daacbf42393ded8878'}
})


//, 5 - заменить , изменить свойство в конакте:
const updateContact = jest.fn((userId, contactId, body) => {
    
    let [contact] = contacts.filter(el => String(el._id) === String(contactId))
    if (contact) {
        contact = {...contact, ...body}
    }
    return contact
})


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}

