import { Router } from 'express';
import Joi from 'joi';

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} from '../../models/contacts.js';
import { HttpError } from '../../helpers/HttpErrors.js';

const router = Router();

//! ------
const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
//! ------

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
    
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
  
      res.status(400).json({
        message: 'Missing required name field'
      });
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({
        message: 'Not found'
      });
    }
    res.status(200).json({
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      res.status(400).json({
      message: 'Missing fields'
    });
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({
      message: 'Not found'
    });
    }
    res.status(200).json(result);  
  } catch (error) {
    next(error);
  }
});

export default router