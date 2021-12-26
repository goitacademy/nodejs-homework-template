import Contact from '../../model/contacts'

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id)
  return result
}
export default removeContact
