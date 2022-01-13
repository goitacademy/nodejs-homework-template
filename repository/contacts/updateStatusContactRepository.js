import Contact from '../../models/contacts/index';

const updateContactFavorite = async (userId, contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body }
  )
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId},
    { ...body },
    { new: true },
  )
  return result
}

export default updateContactFavorite