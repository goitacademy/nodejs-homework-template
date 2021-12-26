import Contact from '../../model/contacts'
const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, { ...body }, { new: true })
  return result
}
export default updateContact
