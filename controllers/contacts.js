
const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/");
const { ctrlWrapper } = require("../helpers")


const listContacts = async (req, res) => {

        const result = await contacts.listContacts();
        res.json(result);
  }

const getById = async (req, res) => {

      const {id} = req.params;
  
      const result = await contacts.getById(id);

      if(!result) {
        throw HttpError (404, "Not found");
  
      }
      res.json(result);
}

const addContact = async (req, res) => {

    //   const {error} = addSchema.validate(req.body)
    //   if(error) {
    //     throw HttpError (400, "missing required name field");
    //   }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
}

const removeContact = async (req, res) => {

      const {id} = req.params;
      const result = await contacts.removeContact(id);
      if(!result) {
        throw HttpError (404, "Not found");
      }
        res.status(200).json({message:"contact deleted"});
  
}

const updateContact = async (req, res) => {

    //   const {error} = addSchema.validate(req.body);
    //   if(error) {
    //       throw HttpError(400, "missing fields");
    //   }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result) {
          throw HttpError(404, "Not found");
      }
      res.json(result);

  }


  module.exports = {
    listContacts:  ctrlWrapper(listContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),

  }