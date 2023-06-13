const { HttpError } = require("../utils");
const contactsService = require("../models/contacts");
const {ctrlWrapper} = require("../middelwares")




const getAllContacts = async (req, res, next) => {
   
      const result = await contactsService.listContacts();
      res.json(result);
    } 

  const getContactById = async (req, res, next) => {
    
      const { id } = req.params;
      const result = await contactsService.getContactById(id);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      }
      res.json(result);
   
  }

  const addContact = async (req, res, next) => {
    
      
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result);
    } 

  const deleteContactById = async (req, res, next) => {
    
      const { id } = req.params;
      const result = await contactsService.removeContact(id);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      }
      res.json({
        message: "Delete success",
      });
    } 

  const updateContactById = async (req, res, next) => {
    
     
      const { id } = req.params;
      const result = await contactsService.updateContactById(id, req.body);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    } 

  module.exports = {
    getAllContacts:ctrlWrapper(getAllContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    deleteContactById:ctrlWrapper(deleteContactById),
    updateContactById:ctrlWrapper(updateContactById)

  }