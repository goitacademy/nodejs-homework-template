import contacts from '../../db/contacts.json'
const getContactById = async (id) => {
  const [contact] = contacts.filter((contact) => contact.id === id)
  return contact
}
export default getContactById
