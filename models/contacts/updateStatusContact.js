import Contact from '../contacts/index';

const updateContactFavoriteController = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body }
  )
  return result
}

export default updateContactFavoriteController