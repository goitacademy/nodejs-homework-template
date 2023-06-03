const Joi = require("joi");

const contacts = require("../models/contacts")

const {HttpErrors} = require("../helpers")

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().messages({
      "any.required":`"phone" is a required field`,  
      "string.empty" : `"phone" cannot be an empty field`,
    }),
    email: Joi.string().required(),
  });

  const getAllReq = async (req, res, next) => {
    try {
      const all = await contacts.listContacts();
      res.json(all);
    } catch (error) {
      next(error);
    }
  }

  const getByIdReq = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const byId = await contacts.getContactById(contactId);
  
      if (!byId) {
        throw HttpErrors(404, "Not found");
      }
      res.json(byId);
    } catch (error) {
      next(error);
    }
  }

const postReq = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpErrors(400, error.message);
      }
      const add = await contacts.addContact(req.body);
      res.status(201).json(add);
    } catch (error) {
      next(error);
    }
  }

const deleteReq = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const remove = await contacts.removeContact(contactId);
  
      if (!remove) {
        throw HttpErrors(404, "Not found");
      }
  
      res.json({
        message: "Delete success",
      });
    } catch (error) {
      next(error);
    }
  }

  const putReq = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpErrors(400, error.message);
      }
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw HttpErrors(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  module.exports = {
    getAllReq,
    getByIdReq,
    postReq,
    deleteReq,
    putReq,
  }