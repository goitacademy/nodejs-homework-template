const addSchema = require("../schemas");
const contacts = require("../models/contacts");
const {HttpError} = require("../helpers");

const getAll = async (req, res, next) => {
    try {
      const result = await contacts.listContacts();
      res.json(result)
    }
    catch(error) {
      next(error);
    } 
}

const getById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await contacts.getContactById(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result)
    }
    catch(error) {
      next(error);
    }
}

const add = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      
      if(error) {
        throw HttpError(400, "missing required name field");
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result)
    }
    catch(error) {
      next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
          throw HttpError(400, "missing fields");
      }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result)
    }
    catch(error) {
      next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await contacts.removeContact(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json({ message: 'contact deleted'})
    }
    catch(error) {
      next(error)
    }
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}