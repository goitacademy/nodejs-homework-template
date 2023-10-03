import { Router } from 'express';


import { addContact } from '../../controlers/addContact.js';
import { delContact } from '../../controlers/delContact.js';
import { getAllContacts } from '../../controlers/getAllContact.js';
import { getContactById } from '../../controlers/getContactById.js';
import { updateFavorite } from '../../controlers/updateContactStatus.js';
import { updateContact } from '../../controlers/updateContact.js';

import { isValidId } from '../../helpers/validateById.js';
import { validateBody } from '../../helpers/validateBody.js';
import { schemas } from '../../schemas/contacts.js';

const router = Router();

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(schemas.addSchema), addContact);

router.delete('/:contactId', isValidId, delContact);
  
router.put('/:contactId', validateBody(schemas.addSchema), isValidId, updateContact);

router.patch('/contacts/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

=======
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