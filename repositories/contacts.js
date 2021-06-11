const ContactSchema = require('../model/contact');
  
const listContacts = async () => {
  const results = await ContactSchema.find();
  console.log(results);
  return results;
};

const getContactById = async (contactId) => {
  const contactById = await ContactSchema.findOne({ _id: contactId });
  return contactById;
};

const removeContact = async (contactId) => {
  const  result  = await ContactSchema.findOneAndRemove({ _id: contactId })
  return result;
}; 

const addContact = async (body) => {
  const result = await ContactSchema.create(body);
  console.log(result);
  return result;
};

const updateContact = async (contactId, body) => { 
  const result  = await ContactSchema.findOneAndUpdate(
    {_id: contactId},
    {...body},
    {new: true}
  );
  return result;
};
 
const updateStatusContact = async (contactId, body) => {
  console.log(body);
  const result  = await ContactSchema.findOneAndUpdate(
    {_id: contactId},
    {favorite: body.favorite},
    {new: true}
  );
  console.log(result);
  return result;
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
  };