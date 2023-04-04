const contacts = require("../models/contacts.js");
const contactsSchema = require("../schemas/contactsSchema.js");
const {ctrlWrapper} = require("../utils/ctrlWrapper.js");

const getAllContacts = async (req, res) => {
      const response = await contacts.listContacts();
      res.json(response);
};

const getContactById = async (req, res) => {
      const response = await contacts.getContactById(req.params.contactId);
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json(response);
      };
};

const addContact = async (req, res) => {
      const {error} = contactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing required name field"});
      }
      else {
        const response = await contacts.addContact(req.body);
        res.status(201).json(response);
      }
};

const deleteContact = async (req, res) => {
      const response = await contacts.removeContact(req.params.contactId);
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json({"message": "contact deleted"});
      };
};

const updateContact = async (req, res, next) => {
      const {error} = contactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing fields"});
      }
      else {
        const response = await contacts.updateContact(req.params.contactId, req.body, );
        console.log(response);
        if(response === null) next()
        else res.json(response);
      };
};


module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact), 
    updateContact: ctrlWrapper(updateContact),
};