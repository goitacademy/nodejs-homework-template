// const {
//     listContacts,
//     // getContactById,
//     // addContact,
//     // removeContact,
//     // updateContact,
//   } = require("../models/contacts");
  const {Contact} = require('../models/contactModel');

  const getContacList = async (req, res, next) => {
    try{
      const contacts = await Contact.find();
    if(contacts) {
      return res.status(200).json({contacts});
    }
    }catch(error){
      console.log(error.message);
    }
    next()
  };

  const getContact =  async (req, res, next) => {
    const {contactId} = req.params;
    try{
      const foundedContact = await Contact.findById(contactId);
    if (foundedContact) {
      return res.status(200).json({message: "contact found", data: foundedContact });
    }
    }catch(error){
      console.log(error.message);
    }
    next();
  
  };

  const addNewContact =  async (req, res, next) => {
    const contact = new Contact(req.body);
    try{
      const newContact = await contact.save();
    if (newContact) {
      return res.status(200).json({message: "add new contact", data: newContact });
    }
    }catch(error){
      console.log(error.message);
    }
    next();
  };

  const deleteContact =  async (req, res, next) => {
    const {contactId} = req.params;
    try{
      const deletedContact = await Contact.findByIdAndDelete(contactId);
    console.log('deleteContact: ', deletedContact);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted", data: deletedContact });
    }
    }catch(error){
      console.log(error.message);
    }
    next();
  
  };

    const  changeContact =  async (req, res, next) => {
      const {contactId} = req.params;
      const {name, email, phone, favorite} = req.body;
      try{
          const renewedContact = await Contact.findByIdAndUpdate(contactId,
            {$set:{name, email, phone, favorite}});
        if (renewedContact) {
          return res.status(200).json({message: "contact renewed", data: renewedContact });
        }
      }catch(error){
        console.log(error.message);
      }
        next();
      
      };
  module.exports = {
    getContacList,
    getContact,
    addNewContact,
    deleteContact,
    changeContact 
  }