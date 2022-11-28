const Contact = require('./schemas');

const getAllContacts = async () => {
  console.log(await Contact.find())
  return await Contact.find();
};

const getContactById = id => {
  return Contact.findById(id);
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite })
}

const updateContact = async (id, { name, email, phone, favorite }) => {
  return await Contact.findByIdAndUpdate({ _id: id },
     {$set:{ name, email, phone, favorite }});
};

const removeContact= id => {
  return Contact.findByIdAndRemove({ _id: id });
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  
};