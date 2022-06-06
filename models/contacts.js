
const {Contact} = require('./contact')

const listContacts = async () => {
  console.log(Contact);
  try {
    const result = await Contact.find({})
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
    
const getContactById = async contactId => {
  try {
    const findedContact = await Contact.findById(contactId);
  console.log(findedContact);
  return findedContact;
  } catch (error) {
    console.log(error);
  }
  
}

const removeContact = async contactId => {
  try {
    console.log(contactId);
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    console.log(deletedContact);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

const addContact = async body => {
  const contacts = await listContacts();
  const { name } = body;
  const isContactInList = contacts.some(contact => contact.name === name);
  if (isContactInList) {
    return console.log('This contact is in the list already');
  }
  try {
    const contact = await Contact.create({...body})
  return contact;
  } catch (error) {
    console.log(error.message);
  }
  
}
const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
  
}


const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    return updatedContact;
  } catch (error) {
     console.log(error.message);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}