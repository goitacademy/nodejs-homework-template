const contacts = require("../models/contacts");
const httpError = require("../helpers/httpError");
const Joi = require("joi");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });  

const listContacts =  async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);
}

const getContactById = async (req, res) => {
      const { contactId } = req.params;
      const result = await contacts.getContactById(contactId);
      if (!result) {
        throw httpError(404, "Not found");
      }
      res.json(result)}

  const addContact = async (req, res) => {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw httpError(400, error.message);
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
  }

  const removeContact = async (req, res) => {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        throw httpError(404, "Not found");
      }
    res.status(200).json({message: "contact deleted"});
  }

  const updateContact = async (req, res) => {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw httpError(400, error.message);
      }
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw httpError(404, "Not found");
      }
      res.json(result);
  }

module.exports = {
    listContacts: ctrlWrapper(listContacts), 
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact)
}