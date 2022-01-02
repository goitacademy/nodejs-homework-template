import Contact from '../contacts/index';

const getById = async (contactId) => {
  const result = await Contact.findById(contactId)
  return result
}

export default getById;
