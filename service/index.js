const {Contact} = require('./schemas/contact');

const getAllContacts = async () => {
  return Contact.find({}, '-createdAt -updatedAt');
};

const getContactById = id => {
  return Contact.findById(id);
};

const createContact = ({name, email, phone}) => {
  return Contact.create({name, email, phone});
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate( id, body, { new: true });
};

const removeContact = id => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};