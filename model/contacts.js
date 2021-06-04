const Contact = require('../schemas/contacts')

const listContacts = async (userId, { limit = 10, offset = 0, sortBy, sortByDesc, filter }) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    { user: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'User',
        select: 'name email'
      }
    })
  return { contacts, total, limit: Number(limit), offset: Number(offset) }
}

const getContactById = async (userId, contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, user: userId })
    return contact
  } catch {
    return {}
  }
}

const removeContact = async (userId, contactId) => {
  try {
    const contact = await Contact.findByIdAndRemove({ _id: contactId, user: userId })
    return contact
  } catch {
    return null
  }
}

const addContact = async (userId, body) => {
  try {
    const response = await Contact.create({ ...body, user: userId })
    return response
  } catch {
    return {}
  }
}

const updateContact = async (userId, contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId, user: userId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch {
    return {}
  }
}

const updateStatusContact = async (userId, contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId, user: userId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch {
    return {}
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
