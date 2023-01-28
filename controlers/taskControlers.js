const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
  } = require("../models/contacts");

  const getContacList = async (req, res, next) => {
    try{
      const contacts = await listContacts();
    if(contacts) {
      return res.status(200).json({contacts});
    }
    }catch(error){
      console.log(error.message);
    }
    next(error.message)
  };

  const getContact =  async (req, res, next) => {
    try{
      const foundedContact = await getContactById(req.params.contactId);
    if (foundedContact) {
      return res.status(200).json({message: "contact found", data: foundedContact });
    }
    }catch(error){
      console.log(error.message);
    }
    next();
  
  };

  const addNewContact =  async (req, res, next) => {
    try{
      const newContact = await addContact(req.body);
    if (newContact) {
      return res.status(200).json({message: "add new contact", data: newContact });
    }
    }catch(error){
      console.log(error.message);
    }
    next();
  };

  const deleteContact =  async (req, res, next) => {
    try{
      const deletedContact = await removeContact(req.params.contactId);
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
        try{
          const renewedContact = await updateContact(req.params.contactId, req.body);
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