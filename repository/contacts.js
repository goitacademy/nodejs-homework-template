import Contact from '../model/contact'
import pkg from 'mongoose'
const { Types } = pkg

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 10, skip = 0 },
) => {
  let sortCriteria = null
  const total = await Contact.countDocuments({ owner: userId })
  let result = Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email age role',
  })
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 }
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 }
  }
  if (filter) {
    result = result.select(filter.split('|').join(' ')) 
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria)
  return { total, contacts: result }
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email age role',
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return result
}

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId })
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true },
  )
  return result
}

const getStatisticsContacts = async (id) => {
  const data = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(id) } },
    {
      $group: {
        _id: 'qweqwe',
        totalAge: { $sum: '$age' },
        minAge: { $min: '$age' },
        maxAge: { $max: '$age' },
        avgAge: { $avg: '$age' },
      },
    },
  ])
  return data
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getStatisticsContacts,
}
