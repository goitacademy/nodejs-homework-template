const { closeSync } = require("fs");
const {
  addContact,
  listContacts,
  removeContact,
  updateContact,
  getContactById,
} = require("../models/contacts");
const HttpError = require("../error/errorHandler");
const joiConfig = require('../joiconfig')
const JOI = require('joi');


class ContactController {
  async create(req, res, next) {
    try {
      const created = await addContact(req.body);
      console.log(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
      res.status(400)
    }
}
  
  async read(req, res, next) {//+
    const list = await listContacts();
    res.status(200).json(list);
  }

  async update(req, res, next) {
    try {

      const body = req.body;
      const contactId = req.params.contactId;
      const contactUpdate = await updateContact(contactId, body); 
      if(!contactUpdate){
        res.status(404).json({message:"Not found"});
      }
      res.status(200).json(contactUpdate);
    } catch (error) {
      next(error);
    }
  }

  async deleted(req, res, next) {//+
    try {
      const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return res.status(404).json({message:"Not found"});
    }
    res.json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
    
  }

  async getById(req,res,next) {//+
    try {
      const { contactId } = req.params;
      const result = await getContactById(contactId);
      if(!result){
        res.status(404).json({message:"Not found"});
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
