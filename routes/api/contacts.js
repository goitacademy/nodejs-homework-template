const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const router = express.Router();
const HttpError=require('../../helpers/HttpError')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res) => {

    const getContacts = await contacts.listContacts();
    res.json(getContacts);
  
});

router.get('/:id', async (req, res) => {

    const { id } = req.params;
    const getOneContact = await contacts.getContactById(id);

    if (getOneContact) {
      res.json(getOneContact);
    } else {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

});

router.post('/', async (req, res) => {

    const { error, value } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({message: "Missing required name field"});
    }
const {name,email,phone }= value
    const addContact = await contacts.addContact({name,email,phone });

    res.status(201).json(addContact);

});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (result) {
      res.json({ message: 'contact deleted' });
    } else {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
  
});

router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const { error, value } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({message: "missing fields" });
    }

    const updateContact = await contacts.updateContact(id, value);

    if (updateContact) {
      res.json(updateContact);
    } else {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
 
});

module.exports = router;
