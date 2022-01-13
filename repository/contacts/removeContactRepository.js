import Contact from '../../models/contacts/index';


const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId})
  return result
}


export default removeContact

