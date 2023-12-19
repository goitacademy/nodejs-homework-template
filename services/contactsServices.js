const Contact = require('../models/contactsModel');


const listContacts = () => Contact.find();

const getContactById = (id) => Contact.findById(id)

const removeContact =(id) => Contact.findByIdAndDelete(id)


const addContact = async (contactData) => {

    const newContact = await Contact.create(contactData);

    return newContact;
      }
 




const updateContact = async (id, contactData) => {
  const updatedContact = await Contact.findById(id).lean();

  Object.keys(contactData).forEach((key) => {
    updatedContact[key] = contactData[key];
  });

  return updatedContact.save();

  }

  const updateStatusContact = async (id, contactData) => {
    const { favorite } = contactData;

  if (favorite === undefined) {
    throw new Error(400, 'missing field favorite');
  }

  const updatedStatus = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!updatedStatus) {
    throw new Error(404, 'Not found');
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
