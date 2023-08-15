import express from 'express';
import Joi from 'joi';
import Contact from '../../models/contacts.js';

const contactsRouter = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
})

contactsRouter.post('/', async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message)
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

contactsRouter.put('/:contactID', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (deletedContact) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({message:'Not found'})
    }
  } catch (err) {
    next(err);
  }
})

export default contactsRouter;
