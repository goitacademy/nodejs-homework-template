const express = require('express');
const Joi = require('joi');
const { ContactsModel } = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const data = await ContactsModel.find({});
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const data = await ContactsModel.findById(req.params.contactId);
  if (!data) {
    return res.status(404).json({ message: 'contact not found' });
  }
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]+$')).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: 'bad request', info: validationResult.error });
  }

  const data = await ContactsModel.create(req.body);
  res.json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await ContactsModel.findByIdAndDelete(req.params.contactId);
  if (!data) {
    return res.status(404).json({ message: 'contact not found' });
  }
  res.status(200).json({ message: 'done' });
});

router.put('/:contactId', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]+$')).required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: 'bad request', info: validationResult.error });
  }

  await ContactsModel.findByIdAndUpdate(req.params.contactId, req.body);
  res.status(200).json({ message: 'done' });
});

router.patch('/:contactId', async (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: 'bad request', info: validationResult.error });
  }

  await ContactsModel.findByIdAndUpdate(req.params.contactId, req.body);
  res.status(200).json({ message: 'done' });
});

module.exports = router;
