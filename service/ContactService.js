const ContactModel = require('../models/contacts')

class ContactService{
    
 listContacts = async () => {
    const contacts = await ContactModel.find();
    return contacts;
  }
  
    getContactById = async (contactId) => {
    const contact =  await ContactModel.findById(contactId);
    return contact || null;
  }
  
    removeContact = async (contactId) => {
    const contact =  await ContactModel.findOneAndRemove({_id:contactId});
    return contact;
  }
  
    addContact = async (body) => {
    const newContact = await ContactModel.create(body);
    return newContact;
  }
  
   updateContact = async (contactId, body) => {
    const result = await ContactModel.findByIdAndUpdate(
        { _id: contactId },
        { ...body },
        { new: true },
      );
      return result;
  }
    
}

module.exports = new ContactService();