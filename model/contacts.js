const Contact = require('./schemas/contact')

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 1,
    offset = 0
  } = query

  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
    path: 'owner',
    select: 'name email subscription -_id',
    },
  })
  const { docs: contacts, totalDocs: total } = results
  return { contacts, total, limit, offset, page }
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
  return result
}

const addContact = async (userId, body) => {
  try {
    const result = await Contact.create({ ...body,  owner: userId })
    return result
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    throw e
  }
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
