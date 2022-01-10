import Contact from '../model/contact'

const listContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 10,
  skip = 0,
}) => {
  let sortCriteria = null
  const total = await Contact.find().countDocuments()
  let result = Contact.find()
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 }
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 }
  }
  if (filter) {
    result = result.select(filter.split('|').join(' ')) // 'name age'
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria)
  return { total, contacts: result }
}

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId)
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId)
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true },
  )
  return result
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
