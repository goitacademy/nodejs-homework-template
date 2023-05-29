const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContacts} = require('../../models/contacts.js');
const Joi = require('joi')

const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try {
    const listCon = await listContacts();
    res.status(200).json(listCon)
  } catch (error) {
      next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getConById = await getContactById(contactId);

    if (!getConById) {
      const error = new Error('Not Found');
      error.status = 404;
      throw error;
    }

    res.json(getConById);

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {

    const { error } = contactSchema.validate(req.body)
    if (error) {
      const error = new Error('missing required field');
      error.status = 400;
      throw error;
    }

    // if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('phone')) {
    //   const error = new Error('missing required name field');
    //   error.status = 400;
    //   throw error;
    // }

    const addCon = await addContact(req.body);
    res.status(201).json(addCon)

  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    console.log(req.params)
    const { contactId } = req.params;
    console.log(contactId)
    const removeCon = await removeContact(contactId)

    console.log(removeCon)

    if (!removeCon) {
      const error = new Error('Not Found');
      error.status = 404;
      throw error;
    }
    
    res.status(200).json({"message": "contact deleted"})

  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const error = new Error("missing required field");
      error.status = 400;
      throw error;
    }

    const {id} = req.params;
    console.log(id)
    const upDateContact = await updateContacts(id, req.body);

    console.log(upDateContact)

    if (!upDateContact) {
      const error = new Error(`missing fields ${id}`);
      error.status = 400;
      throw error;
    }

    res.status(200).json("hello")

  } catch (error) {
    next(error)
  }
})

module.exports = router
