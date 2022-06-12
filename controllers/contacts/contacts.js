const {Contact} = require('../../models')

const listContacts = async (req, res, next) => {
  
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite=null } = req.query;
  
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate('owner', "_id email");
 
  if (favorite === null) {
    res.status(200).json({ status: 'success', code: 200, data: contacts });
  } 
  if (favorite) {
    const contactsByStatus = contacts.filter(contact => contact.favorite === JSON.parse(favorite));
    res.status(200).json({ status: "success", code: 200, data: contactsByStatus})
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await await Contact.findById(contactId);
  res.status(200).json({ status: 'success', code: 200, data: contactById });
  
};    
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ code: 200, status: "success", message: 'contact deleted', data: deletedContact });
}
const addContact = async (req, res, next) => {
  const { _id } = req.user;
  
  const addedContact = await await Contact.create({...req.body, owner: _id});
  res.status(201).json({ status: 'success', code: 201, data: addedContact });
  
}
const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, {...req.body}, {new: true});
    res.status(200).json({ status: "success", code: 200, data: updatedContact });
  } else {
     res.status(400).json({ message: `missing fields` });
  }
}
const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    res.status(200).json({ status: "success", code: 200, data: updatedContact });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}