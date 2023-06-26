const Joi = require("joi");

const contacts = require("../models/contacts");

// const Contact = require("../models/contact")

const {HttpError, ctrlWrapper} = require("../helpers");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
  });

const getAllContacts =  async (req, res) => {
    const result = await contacts.listContacts();
     res.json(result);
   };

   const getContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result)
   };

   const addContact = async (req, res) => {
    const {error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
  };

  const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result)
  };

  const updateContact = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result);
  };


   module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
   }