import Contact from '../../models/contacts/index';


const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
}


export default addContact

