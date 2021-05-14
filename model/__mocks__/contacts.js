const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
  const {
    limit = 5,
    page = 1,
    offset = 0
  } = query
  return { contacts, total: contacts.length, limit, offset, page }
})

const getContactById = jest.fn((userId, contactId) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(contactId))
  return contact
})

const removeContact = jest.fn((userId, contactId) => {
    const index = contacts.findIndex((el) => String(el._id) === String(contactId))
    if (index === -1) {
        return null
    }
    const [contact] = contacts.splice(index, 1)
    return contact
})

const addContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: '609dd45a026e475af87840fg' })
    return { ...body, _id: '609dd45a026e475af87840fg' }
})

const updateContact = jest.fn((userId, contactId, body) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(contactId))
    if (contact) {
      contact = { ...contact, ...body }
    }
    return contact
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
