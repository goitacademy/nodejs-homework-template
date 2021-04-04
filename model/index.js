const Contact = require('../schemas/contactsSchema')


const listContacts = async (userId, {limit = 20, offset = 0, sortBy, sortByDesc, filter,sub}) => {
  
    const {docs: contacts, totalDocs: total} = await Contact.paginate(
      { owner: userId},
       //sub: sub ?  {subscription: sub} : ''},
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? {[`${sortBy}`]: 1} : {}),
          ...(sortByDesc ? {[`${sortByDesk}`]: -1} : {})
        },
        select: filter ? filter.split('|').join('') : '',
        populate: {
          path: 'owner',
          select: 'subscription email',
        }
      }
    )
  return {contacts, total, limit, offset}
  
}
const getContactById = async (contactId, userId) => {
  try {
    return Contact.findOne({ _id: contactId, owner: userId }).populate({
      path: 'owner',
      select: 'username email '
    })
  } catch (error) {
    throw error;
  }
}

const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
return contact
}


const addContact = async (body, userId) => {
  const contact = await Contact.create({...body, owner: userId})
  return contact
}

const updateContact = async (userId, contactId, body) => {
 const contact = Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, {...body}, { new: true })
  return contact
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
