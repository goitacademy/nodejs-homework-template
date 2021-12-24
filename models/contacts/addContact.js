import Contact from '../contacts/index';


const addContact = async (body) => {
  if (!body.favotite) {
    body = {...body, "favotite": false}
  }
  const result = await Contact.create(body);
  return result;
}

  export default addContact;