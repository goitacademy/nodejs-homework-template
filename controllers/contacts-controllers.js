 const Joi = require("joi");

const contactService = require("../models");
const { HttpError } = require("../helpers");

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string()
      .regex(/^\d{3}-\d{2}-\d{2}$/)
      .required(),
  });

  const getAllContacts = async (req, res, next) => {
    try {
      const result = await contactService.listContacts();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

const getContactById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactService.getContactById(contactId);
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} is not found!`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

const addContact = async (req, res, next) => {
    try {
      const { error } = contactAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const result = await contactService.addContact(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

const deleteContactById = async (req, res, next) => {
    try {
  const {contactId} = req.params;
  const result = await contactService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} is not found!`);
  }
  res.json({
  message:"Delete success!"
  })
    }
    catch(error) {
      next (error);
    }
  };

  const updateContactById = async (req, res, next) => {
    try {
      const { error } = contactAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const { contactId } = req.params;
      const result = await contactService.updateContactById(contactId, req.body);
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} is not found!`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  module.exports ={
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById
  };
  
 