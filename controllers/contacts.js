

const contacts = require("../models/contacts");

const HttpError = require("../helpers/HttpError");
const  ctrlWrapper  = require("../helpers/ctrl.Wrapper");


const getAll =  async (req, res) => {

     const result = await contacts.listContacts();
      res.json(result)
   
}

const getContact =  async (req, res) => {
    
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId);
     if(!result){
      throw HttpError(404,"Not found")
     }
      res.json(result)
    
}

const addContact =  async (req, res) => {
    
      
   
      const {name,email,phone} = req.body
      const result = await contacts.addContact(name,email,phone)
    
     res.status(201).json(result)
    
}

const deleteContact = async (req, res) => {
   
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result){
        throw HttpError(404,"Not found")
      }
      res.json({message:"delete succes"})
    
}

const updateContact = async (req, res) => {
    
  
    
     const {contactId} = req.params;
     
     const result = await contacts.updateContact(contactId,req.body);
     if(!result){
       throw HttpError(404,"Not found")
      }
     res.json(result)
    
}



module.exports = {
    getAll:ctrlWrapper(getAll),
    getContact:ctrlWrapper(getContact),
    addContact:ctrlWrapper(addContact),
    deleteContact:ctrlWrapper(deleteContact),
    updateContact:ctrlWrapper(updateContact)
}