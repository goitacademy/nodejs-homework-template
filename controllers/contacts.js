const Joi = require('joi');

const contacts = require("../models/index");

const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  });

    const getAll =  async (req, res) => {        
        const result = await contacts.listContacts();
        res.json(result);
    
    };

    const getContactById = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        if(!result) {
            throw HttpError(404, "Not found");            
        }
        res.json(result);
        
        
    };
  
    const postContactById =  async (req, res) => {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
                
    };

    const putContactById = async (req, res) => {
          const {error} = addSchema.validate(req.body);
          if(error) {
            throw HttpError(400, "missing fields");
          }
          const {contactId} = req.params;
          const result = await contacts.updateContact(contactId, req.body);
          if(!result) {
            throw HttpError(404, "Not found");
          }
          res.json(result);
              
      };

    const deleteContactById = async (req, res) => {
          const {contactId} = req.params;
          const result = await contacts.removeContact(contactId);
          console.log(result);
            if(!result) {
              throw HttpError(404, "Not found");
            }
            res.json({ message: 'contact deleted' });               
      };

  module.exports = {
    getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    postContactById: ctrlWrapper(postContactById),
    putContactById: ctrlWrapper(putContactById),
    deleteContactById: ctrlWrapper(deleteContactById),
  };