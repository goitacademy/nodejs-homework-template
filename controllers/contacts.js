
const contacts =require('../models/contacts')
const { ctrlWrapper, HttpError } = require('../helpers')

const listContacts = async (req, res) => {   
    const result =await contacts.listContacts();
    res.json(result);
  }   

  const getContactById = async (req, res) => {   
      const {id}=req.params;
      const result =await contacts.getContactById(id);
      if(!result){
       throw HttpError(404, "Not found");
      }
      res.json(result)
    }    

  const addContact = async (req, res) => {
    const result =await contacts.addContact(req.body); 
      res.status(201).json(result)
    }     

  const updateContact = async (req, res) => {       
      const {id}=req.params;
      const result =await contacts.updateContact(id, req.body);
      if(!result){
        throw HttpError(404, "Not found");
      }
      res.status(200).json(result)
    }     

  const removeContact = async (req, res) => {
      const {id}=req.params;
      const result =await contacts.removeContact(id);
      if(!result){
        throw HttpError(404, "Not found");
      }
      res.status(200).json({message: "contact deleted"})
    }    

  module.exports = {
    listContacts: ctrlWrapper(listContacts) ,
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact)
  }