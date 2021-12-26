import Contact from '../../model/contacts'

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}
export default addContact
