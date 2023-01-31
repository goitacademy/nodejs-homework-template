const {Contact} = require("../db/contactsModel")
 
const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
}

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.json(contact);
}

const addContact = async (req, res) => {     
  const { name, phone, email } = req.body;

  const contact = new Contact({name, phone, email});
  await contact.save();
  
  res.status(201).json({status: "success"});
}

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;  
  await Contact.findByIdAndRemove(id);
  
  res.json({status: "success"});
}

const putContacts = async (req, res, next) => {  
  const id = req.params.contactId;
  const {name, email, phone} = req.body;
    
  await Contact.findByIdAndUpdate(id, {$set:{name, email, phone}});  
  
  res.json({status: "success"});
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    putContacts
}