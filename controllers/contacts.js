// @ts-nocheck
const { HttpError } = require("../helpers");
const Joi = require("joi");
const {
    listContacts,
    addContact,
    getContactById,
    removeContact,
    updateContact,
  } = require("../models/contacts");

  const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  })

  const getAll = async (req, res, next) => {
    try {
      const result = await listContacts();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  const getById =  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await getContactById(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  const add = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const result = await addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  const deleteContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await removeContact(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "Delete success",
      });
    } catch (error) {
      next(error);
    }
  }

  const update = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const { contactId } = req.params;
      const result = await updateContact(contactId, req.body);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  module.exports = {
    getAll, getById, add, deleteContact, update
  }