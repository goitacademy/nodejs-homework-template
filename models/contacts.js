const Contact = require("./contactModel");

const listContacts = async (req, res) => {
 
  const { _id } = req;
 
  const contacts = await Contact.find({owner: _id}).populate('owner', '_id email subscription').select("-__v");
  
  return contacts;
};

const getContactById = async (contactId) => {
  

  const contactById = await Contact.findById(contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  

  

  const isRemoved = await Contact.findByIdAndDelete(contactId);
  return isRemoved;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);

  return newContact;
};

const updateContact = async (id, body) => {
 
 
  const updatedContact = await Contact.findByIdAndUpdate(id, {...body});
  console.log(updatedContact);
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;

  const updatedStatusContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  console.log(updateStatusContact);

  return updatedStatusContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};