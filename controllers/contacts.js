const contacts = require("../models/contacts");
const {HttpError} = require("../helpers/index");
const contactSchema = require("../schemas/contact");



const getAll = async (req, res, next) => {
    try{
      const result = await contacts.listContacts();
      res.send(result);
    }
    catch(error){
      next(error);
    }
};


const getById = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId);
  
      if(!result) {
        throw HttpError(404, "Not found");
      }
  
      res.status(200).send(result);
    }
    catch(error){
      next(error);
    }
};


const addNewContact =  async (req, res, next) => {
    try{
      if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields are empty");
      };
  
      const { error } = contactSchema.validate(req.body);
  
      if (error) {
        throw HttpError(400, error.message);
      };
  
      const result = await contacts.addContact(req.body);
      res.status(201).send(result);
    }
    catch(error){
      next(error)
    }
};


const deleteById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
  
      if (!result) {
        throw HttpError(404, "Contact was not found");
      };
  
      res.status(200).send({message: "contact deleted"});
    } 
    catch (error) {
        next(error);
    }
};


const updateById = async (req, res, next) => {
    try{
      if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields are empty");
      };
  
      const { error } = contactSchema.validate(req.body);
  
      if (error) {
        throw HttpError(400, error.message);
      };
  
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
  
      if (!result) {
        throw HttpError(404, "Contact was not found");
      };
  
      res.status(200).send(result);
    }
    catch(error){
      next(error)
    }
};


module.exports = { 
    getAll, 
    getById, 
    addNewContact, 
    deleteById, 
    updateById
};