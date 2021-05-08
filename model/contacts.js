const Contacts = require('./schemas/contactsSchema')

const listContacts = async (userId, query) => {
  const { favorite, page = 1, limit = 10 } = query
  const options = { owner: userId }
  if (favorite) options.favorite = favorite
  return await Contacts.paginate(options, {
    page,
    limit,
    populate: {
      path: 'owner',
      select: 'email subscription'
    }
  })
}

const getContactById = async (userId, contactId) => {
  return Contacts.findById({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription'
  })
}

const removeContact = async (userId, contactId) => {
  return await Contacts.findByIdAndDelete({ _id: contactId, owner: userId })
}

const addContact = async (userId, body) => {
  return await Contacts.create({ ...body, owner: userId })
}

const updateContact = async (userId, contactId, body) => {
  return  await Contacts.findByIdAndUpdate({ _id: contactId, owner: userId }, body, { new: true }).populate({
    path: 'owner',
    select: 'email subscription'
  })
}

const updateStatusContact = async (userId, contactId, body) => {
  return  await Contacts.findByIdAndUpdate({ _id: contactId, owner: userId }, body, { new: true }).populate({
    path: 'owner',
    select: 'email subscription'
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
