import Contact from '../contacts/index';

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    // { new: true },
  )
  return result
}

export default updateContact