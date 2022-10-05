const express = require('express');
const Joi = require('joi');
const { RequestError } = require('../../helpers');
const contactsApi = require('../../models/contacts');
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsApi.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsApi.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
     const {error} = addSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
    }
    const result = await contactsApi.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsApi.removeContact(id);
    if (!result) {
      throw RequestError(404, 'Not Found');
    }
    res.json({ message: `deleted contact with ${id}`});
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsApi.updateContact(id, req.body);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
