const Contact = require("./schema/contacts");

const getAllContacts = async ({owner}) => {
  return Contact.find({owner});
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({name, email, phone, favorite, owner}) =>{
  return Contact.create({name, email, phone, favorite, owner})
};

const updateContact = (id, fields) =>{
  return Contact.findByIdAndUpdate({_id:id}, fields, {new: true})
};

const removeContact = (id)=>{
  return Contact.findByIdAndRemove({_id: id})
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact
};