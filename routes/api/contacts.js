import express from 'express';
import { Router } from 'express';
import Joi from 'joi';
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,} from '../../models/contacts.js';

const router = Router();

  const schema  = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .required(),
  });

  

router.get('/', async (req, res, next) => {
  try {
    const getAllContacts = await listContacts();
    res.json(getAllContacts);
  } catch (err) {
    console.message(err.message)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getIdOfContact = await getContactById();
    if (getIdOfContact){
      res.json(getIdOfContact)
    } else {
      res.status(404).json({message:`${contactId} not found`})
    };
  } catch (err) {
    console.message(err.message)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const validatorSchema = schema.validate(req.body);
    const newContact = await addContact(req.body);
    if (newContact) {
      res.status(201).json(newContact)
    } else{
      res.status(500).json(validatorSchema.error.details)
    } }catch (err) {
    console.message(err.message)
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);

    if (deleteContact) {
      res.json({ message: `${contactId} deleted` });
    } else {
      res.status(404).json({ message: ` ${contactId} Not found ` });
    };
  } catch (err) {
    console.message(err.message);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const putUpdContact = await updateContact(contactId);
    const validatorSchema = schema.validate(req.body);

     if (putUpdContact) {
       res.status(201).json(putUpdContact);
     } else {
       res.status(400).json(validatorSchema.error.details)
     };

  } catch (err) {
    console.message(err.message)
  }
});

export default router;
