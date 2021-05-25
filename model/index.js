const Contacts = require('../schemas/contacts')
// userId - добавляем пользователя  (захешировали в quard)

const listContacts = async (userId, query) => {
  const { limit = 20, offset = 0, sortBy, filter, favorite = null } = query
  const optionSeach = { owner: userId }

  if (favorite !== null) {
    optionSeach.favorite = favorite
  }
  const results = await Contacts.paginate(optionSeach, {
    limit,
    offset,
    select: filter ? filter.split('|').join(' ') : '',
    sort: sortBy ? { [`${sortBy}`]: 1 } : {},
  })
  const { docs: contacts, totalDocs: total } = results
  return { contacts, total, limit, offset }
}

const getContactById = async (userId, contactId) => {
  const contacts = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  })
  console.log(contacts)
  return contacts
}

const removeContact = async (userId, contactId) => {
  const deletedContact = await Contacts.findByIdAndDelete(contactId, {
    owner: userId,
  })
  return deletedContact
}
const addContact = async (body) => {
  const newContact = await Contacts.create(body)
  return newContact
}

const updateContact = async (userId, contactId, body) => {
  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
  return updatedContact
}

const updateStatusContact = async (userId, contactId, body) => {
  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
