const express = require('express');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');
const Joi = require('joi');

const schemaPost = Joi.object({
    name: Joi.string()
        .pattern(/^([A-Z]{1}\w{1,14})\s([A-Z]{1}\w{1,14})$/, { invert: false })
        .trim()
        .required()
        .messages({
          'string.pattern.base': `Name should be a type of 'Firstname Lastname' with min/max length 5/30 symbols`,
          'string.empty': `Name cannot be an empty field`,
          'any.required': `Name is a required field`
        }),

    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
          'string.email': `The string is not a valid e-mail`,
          'any.required': `Email is a required field`
        }),

    phone: Joi.string()
        .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, { invert: false })
        .trim()
        .required()
        .messages({
          'string.pattern.base': `Phone should be a type of 'number' like (XXX) XXX-XXXX`,
          'string.empty': `Phone cannot be an empty field`,
          'any.required': `Phone is a required field`
        }),
})

const schemaPut = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .messages({
          'string.base': `Name should be a type of 'text'`,
          'string.empty': `Name cannot be an empty field`,
          'string.min': `Name should have a minimum length 3`,
          'string.max': `Name should have a maximum length 30`,
          'any.required': `Name is a required field`
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .messages({
          'string.email': `The string is not a valid e-mail`,
          'any.required': `Email is a required field`
        }),

    phone: Joi.string()
        .pattern(/^[0-9]+$/, { invert: false })
        .min(8)
        .max(10)
        .trim()
        .messages({
          'string.pattern.base': `Phone should be a type of 'number'`,
          'string.empty': `Phone cannot be an empty field`,
          'string.min': `Phone should have a minimum length 8`,
          'string.max': `Phone should have a maximum length 10`,
          'any.required': `Phone is a required field`
        }),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.status(200).json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    if (contacts.some(element => element.id === contactId.toString())){
      res.status(200).json(await getContactById(contactId))
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
  console.error(err);}
})

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    await schemaPost.validateAsync(req.query);
    const contacts = await listContacts();
    if (contacts.some(element => element.name === name.toString())){
      res.status(400).json({ message: 'contact exist already' })
    } else res.status(201).json(await addContact(req.query));
  } catch (err) {
  res.status(400).json(err.message)}
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    if (contacts.some(element => element.id === contactId.toString())){
      await removeContact(contactId);
      res.status(200).json({ message: 'contact deleted' })
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
  console.error(err);}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (Object.values(req.query).length > 0) {
      const { contactId } = req.params;
      await schemaPut.validateAsync(req.query);
      res.status(200).json(await updateContact(contactId, req.query));
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
  res.status(400).json(err.message)}
})

module.exports = { contactsRouter: router };
