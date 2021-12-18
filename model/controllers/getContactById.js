import contacts from '../contacts.json'
const getContactById = async (id) => {
  const [contact] = contacts.filter((contact) => contact.id === id)
  return contact
}
export default getContactById
