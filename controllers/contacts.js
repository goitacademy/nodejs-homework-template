

const contacts = require('../models/contacts');

const {HttpError, ctrlWrapper} = require("../helpers");


const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result); 
}

const getById = async (req, res) => {
      const {id} = req.params;
      const result = await contacts.getContactById(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
}

const add = async (req, res) => {
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
}

const updateById = async (req, res) => {
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
}

const deleteById = async (req, res) => {
      const {id} = req.params;
      const result = await contacts.removeContact(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json({
          message: "contact deleted"
        })
  }

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById)
}