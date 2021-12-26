import Contact from '../../model/contacts'

const getContactById = async (id) => {
  const result = await Contact.findById(id)
  return result
}
export default getContactById
