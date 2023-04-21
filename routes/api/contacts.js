const express = require('express');
const Joi = require('joi');

const{
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {HttpError} = require("../../helpers");

const addPosts = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),

  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `"phone" is required`,
  }),

})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json(result);
  } catch (error) {
    next(error);
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId)
    if (!result) {
      throw HttpError (404, `Контакт с ${contactId}не найден`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
  
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = addPosts.validate(req.body);
    if (error) {
      throw HttpError (400, error.message);
    }
    const result = await addContact(req.body);

    res.status (201).json(result)
    } 
    catch (error) {
    next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError (404, `Контакт с ${contactId}не найден`);
    }

    res.json({
      message: "Видалено повністю"
    })
  } catch (error) {
    next(error);
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addPosts.validate(req.body);
    
    if (error) {
      throw HttpError (400, error.message);
    }
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError (404, 'Контакт не знайдено');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
